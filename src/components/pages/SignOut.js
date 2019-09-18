import React from 'react';

import { auth } from '../../firebase';

import Button from '@material-ui/core/Button';

const SignOutButton = () => (
  <Button variant="outlined" onClick={auth.doSignOut}>
    Salir
  </Button>
);

export default SignOutButton;
