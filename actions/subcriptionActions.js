import { setError, setLoading } from "@/reducers/authSlice";
import { db } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export const markAsSubscribed = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const userRef = doc(
            db,
            `users/${getAuth().currentUser.uid
            }`
        );

        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 1); // Add one month
        const expiryDate = currentDate.toISOString();

        await updateDoc(userRef, {
            premium: true,
            expiryDate: expiryDate,
        });
    } catch (error) {
        console.error("Error saving subcription", error);
        dispatch(setError(error));
    } finally {
        dispatch(setLoading(false));
    }
};