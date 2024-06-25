import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { firestore, initialProducts } from "../firebase"
import { Product, ProductsContextValue } from "../types"
import { usePopup } from "./Popup"

const ProductsContext = createContext({} as ProductsContextValue)

export const ProductsProvider = ({ children }: { children: React.ReactElement }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const auth = getAuth()
  const userUid = auth.currentUser?.uid
  const userProductsCollection = (userUid: string) => collection(firestore, `users/${userUid}/products`)
  const { openPopup } = usePopup()

  const [isLoading, setIsLoading] = useState<ProductsContextValue["isLoading"]>(true)
  const [productsList, setProductsList] = useState<Product[]>([])

  useEffect(() => {
    const getProducts = (userUid: string) => {
      const displayErrorPopup = () => {
        setIsLoading(false)
        openPopup({ type: "error", message: t("products.get-error") })
      }

      getDocs(userProductsCollection(userUid))
        .then(querySnapshot => {
          const updateList = () => {
            const products = querySnapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() })) as Product[]
            setProductsList(products)
            setIsLoading(false)
          }

          if (querySnapshot.empty) {
            const addInitialProductsPromises = initialProducts.map(product => addDoc(userProductsCollection(userUid), product))

            Promise.all(addInitialProductsPromises)
              .then(updateList)
              .catch(displayErrorPopup)
            return
          }
        
          updateList()
        })
        .catch(displayErrorPopup)
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getProducts(user.uid)
      } else if (productsList !== initialProducts) {
        setProductsList(initialProducts)
      }
    })

    return () => unsubscribe()
  }, [auth])

  const addProduct: ProductsContextValue["addProduct"] = (data) => {
    const newProductId = Math.max(...productsList.map(product => product.id)) + 1
    const newProduct = { id: newProductId, ...data }

    for (const key of Object.keys(data) as (keyof typeof data)[]) {
      if (key === "price") {
        data.price = Number(data.price)
      }
    }

    if (userUid) {
      setDoc(doc(userProductsCollection(userUid)), newProduct)
        .then(() => {
          setProductsList(prev => [newProduct, ...prev])
          openPopup({ type: "success", message: t("products.add-success"), okButton: { action: () => navigate("/products") }, cancelButton: false })
        })
        .catch(() => openPopup({ type: "error", message: t("products.add-error") }))
    }
  }

  const editProduct: ProductsContextValue["editProduct"] = (currentProduct, newData) => {
    let hasChanges: boolean = false

    for (const key of Object.keys(newData) as (keyof typeof newData)[]) {
      if (key === "price") {
        newData.price = Number(newData.price)
      }

      if (currentProduct[key] != newData[key]) {
        hasChanges = true
        break
      }
    }

    if (!hasChanges) {
      openPopup({ type: "warning", message: t("products.edit-no-changes", { name: currentProduct.name }) })
      return
    }

    if (userUid) {
      updateDoc(doc(userProductsCollection(userUid), currentProduct.docId), newData)
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
    if (userUid) {
      openPopup({ type: "danger", message: t("products.delete-confirmation", { name: name }), okButton: { action: () =>
        deleteDoc(doc(userProductsCollection(userUid), docId))
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
