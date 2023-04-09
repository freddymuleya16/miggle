import { Provider } from 'react-redux';
import store  from '../store/store';


import { useRouter } from "next/router";
// import Navbar from '../components/Navbar';
import '../styles/globals.css';
//import "bootstrap/dist/css/bootstrap.min.css";
import "../public/assets/css/animate.min.css";
//import "../public/assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "../public/assets/css/demo.css";
//import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect } from 'react';
import '../utils/firebase';


function MyApp({ Component, pageProps }) {
 
   const router = useRouter();
   
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     console.log("User",user);
  //     if (user) {
  //       // Update store with user data
  //       store.dispatch({ type: "AUTH_USER", payload: user });
  //     } else {
  //       // Redirect to login page
  //       router.push("/auth/login");
  //     }
  //   });

  //   // Cleanup function
  //   return () => unsubscribe();
  // }, [router, store]);


  return (
    <Provider store={store}>
      {/* <Navbar /> */}
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp;