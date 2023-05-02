import { setError, setLoading } from "@/reducers/authSlice";
import { db } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export const addNotification = (uid, title, message) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const notificationRef = collection(db, `notification/${uid}/notifications`);
    await addDoc(notificationRef, {
      title: title,
      message: message,
      link: "/matches",
      read: false,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const markAsRead = (notificationId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const notificationRef = doc(
      db,
      `notification/${
        getAuth().currentUser.uid
      }/notifications/${notificationId}`
    );

    await updateDoc(notificationRef, {
      read: true,
    });
  } catch (error) {
    console.error(error);
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};
