// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { db } from "@/utils/firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const usersCollection = collection(db, "users");

   // Query for all users in the "users" collection
   const querySnapshot = await getDocs(usersCollection);

   // Map the documents to a plain object containing the document ID and data
   const users = querySnapshot.docs

   for (let i = 0; i < users.length; i++) {
    const ele = users[i];
   // const userId = getAuth().currentUser.uid;
    const userDoc = doc(usersCollection, ele.id);
    const updatedData = {
      matches:[],
      swipingHistory: {
      },
    }; 
    await updateDoc(userDoc, updatedData);
   }
    
  res.status(200).json({ name: 'John Doe' })
}
