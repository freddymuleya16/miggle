import {
  setUser,
  setLoading,
  setError,
  setProfileCompleted,
} from "../reducers/authSlice";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  sendEmailVerification,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  collection,
  addDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

export const signup = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch(
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        emailVerified: userCredential.user.emailVerified,
      })
    );
    dispatch(sendVerificationEmail())
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const auth = getAuth();
    const actionCodeSettings = {
      url: process.env.NEXT_PUBLIC_URLROOT + "auth/login",
      handleCodeInApp: true,
    };
    await sendPasswordResetEmail(auth, email, actionCodeSettings);
  } catch (error) {
    console.error(error);
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const resetPassword = (password, oobCode) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const auth = getAuth();

    await confirmPasswordReset(auth, oobCode, password);
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch(
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        emailVerified: userCredential.user.emailVerified,
      })
    );
    
    dispatch(checkUserProfileCompletion());
  } catch (error) {
    console.error(error);
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logout = () => async (dispatch) => {
  const auth = getAuth();
  dispatch(setLoading(true));
  try {
    await auth.signOut();
    dispatch(setUser(null));
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const sendVerificationEmail = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const auth = getAuth();
    const actionCodeSettings = {
      url: process.env.NEXT_PUBLIC_URLROOT,
      handleCodeInApp: true,
    };

    await sendEmailVerification(auth.currentUser, actionCodeSettings);
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const checkUserProfileCompletion = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const db = getFirestore();
    const uid = getAuth().currentUser.uid
    const userRef = doc(db, "users", uid);

    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const { profileCompleted } = userDoc.data();
      dispatch(setProfileCompleted(profileCompleted));
    } else {
      console.log("User document does not exist");
      dispatch(setProfileCompleted(false));
    }
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export const uploadFormToFirebase =
  (
    gender,
    orientation,
    firstName,
    lastName,
    age,
    ageRange,
    distance,
    pictures
  ) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      // Create a reference to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, "pictures");
      pictures = [...pictures];
      console.log("sasdasdas", pictures);
      // Create a reference for each picture uploaded
      const pictureRefs = await Promise.all(
        pictures.map((picture) => {
          const fileRef = ref(
            storage,
            `pictures/${Date.now()}-${picture.name}`
          );
          return uploadBytesResumable(fileRef, picture).then((snapshot) =>
            getDownloadURL(snapshot.ref)
          );
        })
      );

      // Create a reference to Firebase Firestore
      const db = getFirestore();

      console.log("adgrgrg", pictureRefs);

      // Add the form data to Firestore
      const currentUser = getAuth().currentUser;

      await setDoc(doc(collection(db, "users"), currentUser.uid), {
        gender,
        orientation,
        firstName,
        lastName,
        age,
        ageRange,
        distance,
        pictures: pictureRefs,
        createdAt: serverTimestamp(),
        profileCompleted: true,
      });
      
    dispatch(checkUserProfileCompletion());
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };
