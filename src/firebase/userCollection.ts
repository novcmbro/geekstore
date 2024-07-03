import { getAuth } from "firebase/auth"
import { CollectionReference, DocumentData, collection } from "firebase/firestore"
import { firestore } from "./config"

export const userCollection = (endpoint: string): CollectionReference<DocumentData> => {
  const auth = getAuth()
  const userUid = auth.currentUser?.uid
  
  return collection(firestore, `users/${userUid}/${endpoint}`)
}
