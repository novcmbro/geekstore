import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { initialProducts, userCollection } from "../firebase"
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

  useEffect(() => {
    const updateProductsList = (products: typeof productsList) => {
      setProductsList(products)
      setIsLoading(false)
    }

    const getProductsList = () => {
      const openErrorPopup = () => {
        setIsLoading(false)
        openPopup({ type: "error", message: t("products.get-error") })
      }

      getDocs(userCollection("products"))
        .then(querySnapshot => {
          const products = querySnapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() })) as typeof productsList

          if (querySnapshot.empty) {
            const addInitialProductsPromises = initialProducts.map(product => addDoc(userCollection("products"), product))

            Promise.all(addInitialProductsPromises)
              .then(() => updateProductsList(products))
              .catch(openErrorPopup)
            return
          }
          updateProductsList(products)
        })
        .catch(openErrorPopup)
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getProductsList()
        return
      }
      updateProductsList(initialProducts)
    })

    return () => unsubscribe()
  }, [auth])

  const addProduct: ProductsContextValue["addProduct"] = (data) => {
    if (validateUserPermission()) {
      const newProductId = Math.max(...productsList.map(product => product.id)) + 1
      data.price = Number(data.price)
      const newProduct = { id: newProductId, ...data }
  
      addDoc(userCollection("products"), newProduct)
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

      updateDoc(doc(userCollection("products"), currentProduct.docId), newData)
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
        deleteDoc(doc(userCollection("products"), docId))
          .then(() => {
            setProductsList(productsList.filter(product => product.docId !== docId))
            openPopup({ type: "success", message: t("products.delete-success") })
          })
          .catch(() => openPopup({ type: "error", message: t("products.delete-error") }))
      , text: t("products.delete")}})
    }
  }

  productsList.sort((a, b) => b.id - a.id)

  return (
    <ProductsContext.Provider value={{ isLoading, productsList, addProduct, editProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => useContext(ProductsContext)
