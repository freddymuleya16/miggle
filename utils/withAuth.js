import React from "react";
import Router from "next/router";
import { getAuth } from "firebase/auth";
import { connect, useSelector } from "react-redux";
import { setError, setUser } from "@/reducers/authSlice";
import { checkUserProfileCompletion } from "@/actions/authActions";
//import { setUser, setError } from '../store/actions';

const mapStateToProps = (state) => { 
 return {
    
    profileCompleted: state.auth.profileCompleted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetUser: (user) => dispatch(setUser(user)),
    dispatchSetError: (error) => dispatch(setError(error)),
    dispatchCheckProfile: () => dispatch(checkUserProfileCompletion()),
  };
};

const withAuth = (WrappedComponent) => {
  const auth = getAuth();
  class WithAuth extends React.Component {
    componentDidMount() {
      const { dispatchSetUser, dispatchSetError,profileCompleted, dispatchCheckProfile } = this.props;
      auth.onAuthStateChanged((authUser) => {
        
        if (!authUser) {
          Router.push("/welcome");
        } else {
          dispatchCheckProfile()
          dispatchSetUser({
            uid: authUser.uid,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
          });
          if (!authUser.emailVerified) {           
            dispatchSetError("Please verify your email to continue.");
            Router.push("/auth/verify-email");
          }else if(!profileCompleted){
            console.log("profile",profileCompleted)
            Router.push("/profile");
          }else{
            Router.push('/')
          }
        }
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return connect(mapStateToProps, mapDispatchToProps)(WithAuth);
};



const withoutAuth = (WrappedComponent) => {
  const auth = getAuth();
  class WithoutAuth extends React.Component {
    componentDidMount() {
      const { dispatchSetUser, dispatchSetError } = this.props;
      auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          console.log(authUser.emailVerified);
          if (!authUser.emailVerified) {
            dispatchSetUser({
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
            });
            dispatchSetError("Please verify your email to continue.");
            Router.push("/auth/verify-email");
          } else {
            Router.push("/");
          }
        }
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithoutAuth.displayName = `withoutAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return connect(mapStateToProps, mapDispatchToProps)(WithoutAuth);
};

export { withAuth, withoutAuth };
