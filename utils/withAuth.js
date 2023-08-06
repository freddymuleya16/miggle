import React from "react";
import { getAuth } from "firebase/auth";
import { connect } from "react-redux";
import { setError, setUser } from "@/reducers/authSlice";
import { checkUserProfileCompletion } from "@/actions/authActions";
import FullscreenLoading from "@/components/FullscreenLoading";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Router from "next/router";
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
  class WithAuth extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: null,
        loading: true,
      };
    }

    componentDidMount() {
      const auth = getAuth();

      // Check if the user is logged in
      //const currentUser = auth.currentUser;

      auth.onAuthStateChanged((currentUser) => {
        if (!currentUser) {
          Router.push("/welcome");
          return;
        }

        // Check if the currentUser is verified
        if (
          !currentUser.emailVerified &&
          !Router.pathname.includes("/verify-email")
        ) {
          Router.push("/auth/verify-email");
          return;
        }

        const { uid } = currentUser;
        const firestore = getFirestore();
        // Check if the currentUser's profile is completed
        const userRef = doc(firestore, "users", uid);
        getDoc(userRef).then((userDoc) => {
          const userData = { ...userDoc.data(), id: userDoc.id };

          if (
            (!userData || !userData.profileCompleted) &&
            !Router.pathname.includes("/profile") &&
            !Router.pathname.includes("/verify-email")
          ) {
            Router.push("/profile");
            //////console.log(Router.pathname)
            return;
          }
          this.setState({ user: userData, loading: false });
        });
      });
    }

    render() {
      const { user, loading } = this.state;
      if (loading) {
        return <FullscreenLoading />;
      }
      return <WrappedComponent {...this.props} user={user} />;
    }
  }

  WithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return connect(mapStateToProps, mapDispatchToProps)(WithAuth);
};

const withAuth3 = (WrappedComponent) => {
  const WithAuth = (props) => {
    const auth = getAuth();
    const firestore = getFirestore();

    // Check if the user is logged in
    const user = auth.currentUser;
    if (!user) {
      Router.push("/welcome");
      return <FullscreenLoading />;
    }

    // Check if the user is verified
    if (!user.emailVerified) {
      Router.push("/verify-email");
      return <FullscreenLoading />;
    }

    const { uid } = user;

    // Check if the user's profile is completed
    const userRef = doc(firestore, "users", uid);
    const userDoc = getDoc(userRef);
    const userData = userDoc.data();

    if (
      (!userData || !userData.profileCompleted) &&
      !Router.pathname.includes("/profile")
    ) {
      //Router.push("/profile");
      //////console.log(Router.pathname)
      return <FullscreenLoading />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

const withoutAuth = (WrappedComponent) => {
  const auth = getAuth();
  class WithoutAuth extends React.Component {
    componentDidMount() {
      const { dispatchSetUser, dispatchSetError } = this.props;
      auth.onAuthStateChanged((authUser) => {
        if (authUser) {
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
