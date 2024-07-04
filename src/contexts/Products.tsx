import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { firestore, initialProducts } from "../firebase"
import { Product, ProductsContextValue } from "../types"
import { usePopup } from "./Popup"

const ProductsContext = createContext({} as ProductsContextValue)

export const ProductsProvider = ({ children }: { children: React.ReactElement }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const auth = getAuth()
  const { openPopup } = usePopup()
  
  const [isLoading, setIsLoading] = useState<ProductsContextValue["isLoading"]>(true)
  const [productsList, setProductsList] = useState<Product[]>([])

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

        if (querySnapshot.empty && isFirstAccess) {
          const addInitialProductsPromises = initialProducts.map(product => addDoc(userProductsCollection(), product))

          Promise.all(addInitialProductsPromises)
            .then(() => updateProductsList(products))
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
              getProductsList(true)
              updateDoc(userDoc, setFirstAccessValue(false))
              return
            }

            getProductsList()
          })
          .catch(validateUserPermission)
        return
      }
      updateProductsList(initialProducts)
    })

    return () => unsubscribe()
  }, [auth])

  const addProduct: ProductsContextValue["addProduct"] = (data) => {
    if (validateUserPermission()) {
      const newProductId = productsList.length > 0 ? Math.max(...productsList.map(product => product.id)) + 1 : 1
      data.price = Number(data.price)
      const newProduct = { id: newProductId, ...data }
  
      addDoc(userProductsCollection(), newProduct)
        .then((docRef) => {
          setProductsList(prev => [{ docId: docRef.id, ...newProduct }, ...prev])
          openPopup({ type: "success", message: t("products.add-success"), okButton: { action: () => navigate("/products") }, cancelButton: false })
        })
        .catch(() => openPopup({ type: "error", message: t("products.add-error") }))
    }
  }

  const editProduct: ProductsContextValue["editProduct"] = (currentProduct, newData) => {
    if (validateUserPermission()) {
      let hasChanges: boolean = false
      
      for (const key of Object.keys(newData) as (keyof typeof newData)[]) {
        if (currentProduct[key] != newData[key]) {
          hasChanges = true
          break
        }
      }
      
      if (!hasChanges) {
        openPopup({ type: "warning", message: t("products.edit-no-changes", { name: currentProduct.name }) })
        return
      }
      
      newData.price = Number(newData.price)

      updateDoc(doc(userProductsCollection(), currentProduct.docId), newData)
        .then(() => {
          openPopup({ type: "success", message: t("products.edit-success"), okButton: { action: () => navigate("/products") }, cancelButton: false })

          const listWithUpdatedProduct = productsList.map(product => {
            if (product.docId === currentProduct.docId) {
              return { ...product, ...newData }
            }
            return product
          })

          setProductsList(listWithUpdatedProduct)
        })
        .catch(() => openPopup({ type: "error", message: t("products.edit-error") }))
    }
  }

  const deleteProduct: ProductsContextValue["deleteProduct"] = (docId, name) => {
    if (validateUserPermission()) {
      openPopup({ type: "danger", message: t("products.delete-confirmation", { name: name }), okButton: { action: () =>
        deleteDoc(doc(userProductsCollection(), docId))
          .then(() => {
            setProductsList(productsList.filter(product => product.docId !== docId))
            openPopup({ type: "success", message: t("products.delete-success") })
          })
          .catch(() => openPopup({ type: "error", message: t("products.delete-error") }))
      , text: t("products.delete")}})
    }
  }

  const restoreDefaultProducts: ProductsContextValue["restoreDefaultProducts"] = () => {
    if (validateUserPermission()) {
      openPopup({ type: "danger", message: t("products.restore-confirmation"), okButton: { action: () => {
        setIsLoading(true)

        getDocs(userProductsCollection())
          .then(querySnapshot => {
            const deleteAllProductsPromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref))
            return Promise.all(deleteAllProductsPromises)
          })
          .then(() => {
            const addInitialProductsPromises = initialProducts.map(product => addDoc(userProductsCollection(), product))
            return Promise.all(addInitialProductsPromises)
          })
          .then(initialProductsAdded => {
            const getInitialProductsPromises = initialProductsAdded.map(doc => {
              getDoc(doc).then(querySnapshot => ({ docId: querySnapshot.id, ...querySnapshot.data() }))
            })
            return Promise.all(getInitialProductsPromises)
          })
          .then(() => {
            getProductsList()
            openPopup({ type: "success", message: t("products.restore-success") })
          })
          .catch(() => {
            setIsLoading(false)
            openPopup({ type: "error", message: t("products.restore-error") })
          })
      }, text: t("products.restore")}})
    }
  }

  productsList.sort((a, b) => b.id - a.id)

  return (
    <ProductsContext.Provider value={{ isLoading, productsList, addProduct, editProduct, deleteProduct, restoreDefaultProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => useContext(ProductsContext)
