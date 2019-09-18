import React from 'react';

import AuthUserContext from '../auth/AuthUserContext';
import withAuthorization from '../auth/withAuthorization';
import PasswordChangeForm from './PasswordChange';

import Typography from '@material-ui/core/Typography';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className="container">
        <Typography variant="display1" gutterBottom align="center">
          Usuario: {authUser.email}
        </Typography>
        <div className="layout">
          <PasswordChangeForm />
        </div>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
