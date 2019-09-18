import React, { useState, useEffect } from 'react';

import AuthUserContext from './AuthUserContext';
import { firebase } from '../../firebase';

const withAuthentication = Component => {
  const Auth = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
      firebase.auth.onAuthStateChanged(authUser =>
        setAuthUser(authUser || null)
      );
    }, []);

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component />
      </AuthUserContext.Provider>
    );
  };
  return Auth;
};

export default withAuthentication;
