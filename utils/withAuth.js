import React from 'react';
import Router from 'next/router';
import { getAuth } from 'firebase/auth';

const withAuth = (WrappedComponent) => {
  const auth = getAuth();
  class WithAuth extends React.Component {
    componentDidMount() {
      auth.onAuthStateChanged((authUser) => {
        if (!authUser) {
          Router.push('welcome');
        }
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  WithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuth;
};

const withoutAuth = (WrappedComponent) => {
  const auth = getAuth();
  class WithoutAuth extends React.Component {
    componentDidMount() {
      auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          Router.push('/');
        }
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  WithoutAuth.displayName = `withoutAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithoutAuth;
};
 
export { withAuth, withoutAuth };
