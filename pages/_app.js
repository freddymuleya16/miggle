import { Provider, useSelector } from 'react-redux';
import store  from '../store/store';


import { useRouter } from "next/router";
// import Navbar from '../components/Navbar';
import '../styles/globals.css';
//import "bootstrap/dist/css/bootstrap.min.css";
import "../public/assets/css/animate.min.css";
//import "../public/assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "../public/assets/css/demo.css";
//import "@fortawesome/fontawesome-free/css/all.min.css";
import '../utils/firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/* <Navbar /> */}
      <ToastContainer />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp;