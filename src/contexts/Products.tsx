import { createContext, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { firestore, initialProducts } from "../firebase"
import { Product, ProductsContextValue } from "../types"
import { usePopup } from "./Popup"

const ProductsContext = createContext<ProductsContextValue>({
  isLoading: false,
  productsList: [],
  deleteProduct: function (_docId: string | undefined): void {
    throw new Error("Function not implemented.")
  }
})

export const ProductsProvider = ({ children }: { children: React.ReactElement }) => {
  const { t } = useTranslation()
  const { openPopup } = usePopup()
  const auth = getAuth()
  const userProductsCollection = (userUid: string) => collection(firestore, `users/${userUid}/products`)

  const [isLoading, setIsLoading] = useState<ProductsContextValue["isLoading"]>(true)
  const [productsList, setProductsList] = useState<Product[]>([])

  useEffect(() => {
    const getProducts = (userUid: string) => {
      const displayErrorPopup = () => {
        setIsLoading(false)
        openPopup({ type: "error", message: t("products.failed-to-get") })
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

  const deleteProduct: ProductsContextValue["deleteProduct"] = (docId) => {
    const user = auth.currentUser

    if (user) {
      deleteDoc(doc(userProductsCollection(user.uid), docId))
        .then(() => {
          setProductsList(productsList.filter(product => product.docId !== docId))
          openPopup({ type: "success", message: t("products.success-to-delete") })
        })
        .catch(() => openPopup({ type: "error", message: t("products.failed-to-delete") }))
    }
  }

  productsList.sort((a, b) => b.id - a.id)

  return (
    <ProductsContext.Provider value={{ isLoading, productsList, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => useContext(ProductsContext)
