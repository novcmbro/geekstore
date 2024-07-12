import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { firestore } from "../firebase"
import { initialProductsList, routesBasePath } from "../utils"
import { Product, ProductsContextValue } from "../types"
import { usePopup } from "./Popup"

const ProductsContext = createContext({} as ProductsContextValue)

export const ProductsProvider = ({ children }: { children: React.ReactElement }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const auth = getAuth()
  const { openPopup } = usePopup()
  
  const [isLoading, setIsLoading] = useState(true)
  const [productsList, setProductsList] = useState<Product[]>([])

  const initialProductFormValues: ProductsContextValue["initialProductFormValues"] = {
    image: "",
    category: "",
    name: "",
    price: "0.00" as unknown as number,
    description: ""
  }

  const validateUserPermission = () => {
    const userUid = auth.currentUser?.uid

    if (userUid) {
      return true
    }
    openPopup({ type: "error", message: t("products.no-permission") })
  }

  const userProductsCollection = () => {
    const userUid = auth.currentUser?.uid
    return collection(firestore, `users/${userUid}/products`)
  }

  const updateProductsList = (products: typeof productsList) => {
    setProductsList(products)
    setIsLoading(false)
  }

  const getProductsList = (isFirstAccess?: boolean) => {
    const openGetErrorPopup = () => {
      setIsLoading(false)
      openPopup({ type: "error", message: t("products.get-error") })
    }

    getDocs(userProductsCollection())
      .then(querySnapshot => {
        const products = querySnapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() })) as typeof productsList

        if (isFirstAccess) {
          const addInitialProductsPromises = initialProductsList.map(product => addDoc(userProductsCollection(), product))

          Promise.all(addInitialProductsPromises)
            .then(() => getProductsList())
            .catch(openGetErrorPopup)
          return
        }
        updateProductsList(products)
      })
      .catch(openGetErrorPopup)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDoc = doc(firestore, `users/${user.uid}`)
        const setFirstAccessValue = (value: boolean) => ({ "is-first-access": value })

        getDoc(userDoc)
          .then(docSnapshot => {
            const isFirstAccess = docSnapshot.get("is-first-access")

            if (isFirstAccess === undefined) {
              getProductsList(true)
              setDoc(userDoc, setFirstAccessValue(true))
              return
            }

            if (!!isFirstAccess) {
              updateDoc(userDoc, setFirstAccessValue(false))
              return
            }

            getProductsList()
          })
          .catch(validateUserPermission)
        return
      }
      updateProductsList(initialProductsList)
    })

    return () => unsubscribe()
  }, [auth])

  const addProduct: ProductsContextValue["addProduct"] = (product) => {
    if (validateUserPermission()) {
      const newProductId = !!productsList.length ? Math.max(...productsList.map(product => product.id)) + 1 : 1
      product.price = Number(product.price)
      const newProduct = { id: newProductId, ...product }
  
      addDoc(userProductsCollection(), newProduct)
        .then(doc => {
          setProductsList(prev => [{ docId: doc.id, ...newProduct }, ...prev])
          openPopup({ type: "success", message: t("products.add-success"), okButton: { action: () => navigate(`${routesBasePath}/admin-menu`) }, cancelButton: false })
        })
        .catch(() => openPopup({ type: "error", message: t("products.add-error") }))
    }
  }

  const editProduct: ProductsContextValue["editProduct"] = (currentProduct, newProduct) => {
    if (validateUserPermission()) {
      let hasChanges: boolean = false
      
      for (const key of Object.keys(newProduct) as (keyof typeof newProduct)[]) {
        if (currentProduct[key] != newProduct[key]) {
          hasChanges = true
          break
        }
      }
      
      if (!hasChanges) {
        openPopup({ type: "warning", message: t("products.edit-no-changes", { productName: currentProduct.name }) })
        return
      }
      
      newProduct.price = Number(newProduct.price)

      updateDoc(doc(userProductsCollection(), currentProduct.docId), newProduct)
        .then(() => {
          openPopup({ type: "success", message: t("products.edit-success"), okButton: { action: () => navigate(`${routesBasePath}/admin-menu`) }, cancelButton: false })

          const listWithUpdatedProduct = productsList.map(product => {
            if (product.docId === currentProduct.docId) {
              return { ...product, ...newProduct }
            }
            return product
          })

          setProductsList(listWithUpdatedProduct)
        })
        .catch(() => openPopup({ type: "error", message: t("products.edit-error") }))
    }
  }

  const deleteProduct: ProductsContextValue["deleteProduct"] = (productDocId, productName) => {
    if (validateUserPermission()) {
      openPopup({ type: "danger", message: t("products.delete-confirmation", { productName: productName }), okButton: { action: () =>
        deleteDoc(doc(userProductsCollection(), productDocId))
          .then(() => {
            setProductsList(productsList.filter(product => product.docId !== productDocId))
            openPopup({ type: "success", message: t("products.delete-success") })
          })
          .catch(() => openPopup({ type: "error", message: t("products.delete-error") }))
      , text: t("products.delete")}})
    }
  }

  const restoreDefaultProducts: ProductsContextValue["restoreDefaultProducts"] = () => {
    if (validateUserPermission()) {
      let listHasChanges = productsList.length !== initialProductsList.length
      const shouldVerifyProductsValues = !listHasChanges

      if (shouldVerifyProductsValues) {
        for (const product of productsList) {
          for (const [productKey, productValue] of Object.entries(product)) {
            if (productKey === "docId") {
              continue
            }
            const initialProduct = initialProductsList.find(initialProduct => product.id === initialProduct.id)
            const productAddedOrEdited = !initialProduct || productValue !== initialProduct[productKey as keyof typeof initialProduct]
  
            if (productAddedOrEdited) {
              listHasChanges = true
              break
            }
          }
  
          if (listHasChanges) {
            break
          }
        }
      }
      
      if (!listHasChanges) {
        openPopup({ type: "warning", message: t("products.restore-no-changes") })
        return
      }

      openPopup({ type: "danger", message: t("products.restore-confirmation"), okButton: { action: () =>
        getDocs(userProductsCollection())
          .then(querySnapshot => {
            setIsLoading(true)
            const deleteAllProductsPromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref))
            return Promise.all(deleteAllProductsPromises)
          })
          .then(() => {
            const addInitialProductsPromises = initialProductsList.map(product => addDoc(userProductsCollection(), product))
            return Promise.all(addInitialProductsPromises)
          })
          .then(() => {
            openPopup({ type: "success", message: t("products.restore-success") })
            getProductsList()
          })
          .catch(() => {
            if (isLoading) {
              setIsLoading(false)
            }
            openPopup({ type: "error", message: t("products.restore-error") })
          })
      , text: t("products.restore")}})
    }
  }

  productsList.sort((a, b) => b.id - a.id)

  return (
    <ProductsContext.Provider value={{ initialProductFormValues, isLoading, productsList, addProduct, editProduct, deleteProduct, restoreDefaultProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => useContext(ProductsContext)
