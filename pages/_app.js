import { Provider, useSelector } from 'react-redux';
import store from '../store/store';


import { useRouter } from "next/router";
// import Navbar from '../components/Navbar';
import '../styles/globals.css';
import '../styles/main.css';
//import "bootstrap/dist/css/bootstrap.min.css";
import "../public/assets/css/animate.min.css";
//import "../public/assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "../public/assets/css/demo.css";
//import "@fortawesome/fontawesome-free/css/all.min.css";
import '../utils/firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';


function MyApp({ Component, pageProps }) {
  useEffect(() => {

    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);

        // Update user's online status when they log in
        updateDoc(userRef, { isOnline: true });

        // Detect when the user navigates away from the app and update last seen
        window.addEventListener('beforeunload', () => {
          updateDoc(userRef, { isOnline: false, lastSeen: serverTimestamp() });
        });

        // Set up a listener for changes in the Firestore document
        const unsubscribe = onSnapshot(userRef, (doc) => {
          const data = doc.data();
          // Update UI with online status and last seen information
        });

        // Cleanup the listener when the component unmounts
        return () => {
          updateDoc(userRef, { isOnline: false, lastSeen: serverTimestamp() });
          unsubscribe();
        };
      }
    });
  }, []);

  return (
    <Provider store={store}>
      {/* <Navbar /> */}
      <ToastContainer />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp;