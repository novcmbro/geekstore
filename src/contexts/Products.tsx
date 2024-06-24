import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { firestore, initialProducts } from "../firebase"
import { Product, ProductToEdit, ProductsContextValue } from "../types"
import { usePopup } from "./Popup"

const ProductsContext = createContext<ProductsContextValue>({
  isLoading: false,
  productsList: [],
  editProduct: function (_docId: string | undefined, _newData: ProductToEdit): void {
    throw new Error("Function not implemented.")
  },
  deleteProduct: function (_docId: string | undefined): void {
    throw new Error("Function not implemented.")
  }
})

export const ProductsProvider = ({ children }: { children: React.ReactElement }) => {
  const navigate = useNavigate()
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

  const editProduct: ProductsContextValue["editProduct"] = (docId, newData) => {
    const user = auth.currentUser

    if (user) {
      updateDoc(doc(userProductsCollection(user.uid), docId), newData)
        .then(() => {
          openPopup({ type: "success", message: t("products.edit-success"), okButton: {
              action: () => navigate("/products")
            },
            cancelButton: false
          })

          const listWithUpdatedProduct = productsList.map(product => {
            if (product.docId === docId) {
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
    const user = auth.currentUser

    if (user) {
      openPopup({ type: "warning", message: t("products.delete-confirmation", { name: name }), okButton: {
        action: () => deleteDoc(doc(userProductsCollection(user.uid), docId))
          .then(() => {
            setProductsList(productsList.filter(product => product.docId !== docId))
            openPopup({ type: "success", message: t("products.delete-success") })
          })
          .catch(() => openPopup({ type: "error", message: t("products.delete-error") })),
        text: t("products.delete")
      }})
    }
  }

  productsList.sort((a, b) => b.id - a.id)

  return (
    <ProductsContext.Provider value={{ isLoading, productsList, editProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => useContext(ProductsContext)
