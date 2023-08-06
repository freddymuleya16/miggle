import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "./firebase";
import CryptoJS from 'crypto-js';

// Function to calculate distance between two locations using Haversine formula
export const calculateDistance = (location1, location2) => {
  const { latitude: lat1, longitude: lng1 } = location1;
  const { latitude: lat2, longitude: lng2 } = location2;

  const earthRadius = 6371; // km
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance.toFixed(0);
};

// Helper function to convert degrees to radians
const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          resolve(location);
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
}
// Get the chat document for two given user IDs
export const getChatDocument = async (user1Id, user2Id, from = 'unkown') => {
  const chatCollection = collection(db, "chats");
  // Create a query for all chat documents that contain user1Id
  const q = query(chatCollection, where("users", "array-contains", user1Id));
  const querySnapshot = await getDocs(q);
  // Filter the results to find the chat document that contains both user1Id and user2Id
  const matchingDocs = querySnapshot.docs.filter((doc) => {
    return doc.data().users.includes(user2Id);
  });
  //console.log('Matching Docs', matchingDocs, 'from:', from)
  // If there's a match, return the chat document ID
  if (matchingDocs.length > 0) {
    return matchingDocs[0].id;
  } else {
    // If there's no match, create a new chat document and return its ID
    const newChatRef = doc(chatCollection);
    await setDoc(newChatRef, {
      id: newChatRef.id,
      users: [user1Id, user2Id],
      lastestDoc: from
    });
    //console.log('New Chat ID', newChatRef.id)
    return newChatRef.id;
  }
};
export const getChatDocumentWithoutCreating = async (user1Id, user2Id) => {
  const chatCollection = collection(db, "chats");
  // Create a query for all chat documents that contain user1Id
  const q = query(chatCollection, where("users", "array-contains", user1Id));
  const querySnapshot = await getDocs(q);
  // Filter the results to find the chat document that contains both user1Id and user2Id
  const matchingDocs = querySnapshot.docs.filter((doc) => {
    return doc.data().users.includes(user2Id);
  });
  // If there's a match, return the chat document ID
  if (matchingDocs.length > 0) {
    return matchingDocs[0].id;
  } else {
    return null;
  }
};

export const encryptMessage = (message) => {
  const encrypted = CryptoJS.AES.encrypt(message, process.env.NEXT_PUBLIC_ENCRYPTION_KEY).toString();
  return encrypted;
};

export const decryptMessage = (encryptedMessage) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedMessage, process.env.NEXT_PUBLIC_ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
  return decrypted;
};

export const convertToBase64 = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    // The result contains the Base64 data URL
    //console.log('Photo',reader.result);
    return reader.result;
  };
};
