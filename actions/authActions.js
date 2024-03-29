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
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithCredential,
  fetchSignInMethodsForEmail,
  EmailAuthProvider,
  linkWithPopup,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  collection,
  addDoc,
  setDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  updateDoc,
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
    dispatch(sendVerificationEmail());
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
    console.log(actionCodeSettings)
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

    const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        active:true,
      });

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
    const userRef = doc(db, 'users', getAuth().currentUser.uid);

    // Update user's online status and last seen when they log out
    await updateDoc(userRef, { isOnline: false, lastSeen: serverTimestamp() });

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
    const db_ = db;
    const uid = getAuth().currentUser.uid;
    const userRef = doc(db_, "users", uid);

    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const { profileCompleted } = userDoc.data();
      dispatch(setProfileCompleted(profileCompleted));
    } else {
      //console.log("User document does not exist");
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
import { db } from "@/utils/firebase";

export const uploadFormToFirebase = (
  gender,
  orientation,
  firstName,
  lastName,
  age,
  ageRange,
  distance,
  pictures,
  location,
  aboutMe,
  editMode = false
) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Create a reference to Firebase Storage
    const storage = getStorage();
    const storageRef = ref(storage, "pictures");
    pictures = [...pictures];

    // Create a reference for each picture uploaded
    const pictureRefs = await Promise.all(
      pictures.map((picture) => {
        if (typeof picture === "string" || picture instanceof String) {
          // Picture is already uploaded, return the URL directly
          return picture;
        } else {
          // Picture is being uploaded, upload it to Firebase Storage
          const fileRef = ref(
            storage,
            `pictures/${Date.now()}-${picture.name}`
          );
          return uploadBytesResumable(fileRef, picture).then((snapshot) =>
            getDownloadURL(snapshot.ref)
          );
        }
      })
    );

    // Create a reference to Firebase Firestore
    const db_ = db;
    const currentUser = getAuth().currentUser;

    if (editMode) {
      // Update the existing user document in Firestore
      const userRef = doc(db_, "users", currentUser.uid);
      await updateDoc(userRef, {
        gender,
        orientation,
        firstName,
        lastName,
        age,
        ageRange,
        distance,
        pictures: pictureRefs,
        aboutMe,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        active:true,
      });
    } else {
      // Create a new user document in Firestore
      await setDoc(doc(db_, "users", currentUser.uid), {
        email: currentUser.email,
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
        aboutMe,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      });
    }

    dispatch(checkUserProfileCompletion());
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};


export const facebookSignIn = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // IdP data available using getAdditionalUserInfo(result)
  } catch (error) {
    if (error.code === "auth/account-exists-with-different-credential") {
      const { email } = error.customData;
      const providers = await fetchSignInMethodsForEmail(getAuth(), email);
console.log("Providers",providers,error.customData)
      if (confirm(`You have already registered with ${providers[0]}. Do you want to link your Facebook account?`)) {
        const provider = new FacebookAuthProvider();
        let prov;
        if (providers[0] === 'google.com') {
          prov = new GoogleAuthProvider();
        } else if (providers[0] === 'password') {
          prov = new EmailAuthProvider();
        }else{ 
          prov = new GoogleAuthProvider();
        }
        const user = await signInWithPopup(getAuth(), prov);
        const auth = getAuth();
        linkWithPopup(auth.currentUser, provider).then((result) => {
          // Accounts successfully linked.
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const user = result.user;
          // ...
        }).catch((error) => {
          console.log(error)
          // Handle Errors here.
          // ...
        });
        // try {
        //   let prov;
        //   if (providers[0] === 'google.com') {
        //     prov = new GoogleAuthProvider();
        //   } else if (providers[0] === 'password') {
        //     prov = new EmailAuthProvider();
        //   }
        //   const user = await signInWithPopup(getAuth(), prov);
        //   const credential = FacebookAuthProvider.credentialFromError(error);
        //   console.log('credentials',credential)
        //   await linkWithCredential(user, credential);
        //   console.log("New provider successfully linked!");
        // } catch (linkError) {
        //   if (error.code === "auth/popup-blocked") {
        //     // Handle the "popup-blocked" error
        //     alert("Popup blocked. Please enable popups to sign in.");
        //   }
        //   console.error("Error linking provider:", linkError);
        //   // Handle the error that occurred while linking the new provider.
        // }
      } else {
        // User chose not to link accounts, handle as needed.
      }
    } else if (error.code === "auth/popup-blocked") {
      // Handle the "popup-blocked" error
      alert("Popup blocked. Please enable popups to sign in.");
    } else {
      console.error(error);
      dispatch(setError(error));
    }
  } finally {
    dispatch(setLoading(false));
  }
};

export const googleSignIn = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const provider = new GoogleAuthProvider();

    const auth = getAuth();

    const result = await signInWithPopup(auth, provider);

    //console.log(result);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    console.error(error);
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export async function getUser(uid) {
  const q = query(collection(db, "users"), where("__name__", "==", uid));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const doc = querySnapshot.docs[0];
  const user = { id: doc.id, ...doc.data() };

  return user;
}
