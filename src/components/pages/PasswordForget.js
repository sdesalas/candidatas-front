import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import * as ROUTES from '../../constants/routes';

const PasswordForgetForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const setInitialState = () => {
    setEmail('');
    setError(null);
  };

  const onSubmit = event => {
    auth
      .doPasswordReset(email)
      .then(() => setInitialState())
      .catch(error => setError(error));

    event.preventDefault();
  };

  const isInvalid = email === '';

  return (
    <form className="form">
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={event => setEmail(event.target.value)}
        type="email"
        placeholder="nombre.apellido@example.com"
      />
      <Button
        variant="contained"
        disabled={isInvalid}
        onClick={onSubmit}
        className="button--submit"
      >
        Resetear Mi Contraseña
      </Button>
      {error && (
        <Typography variant="body1" gutterBottom>
          {error.message}
        </Typography>
      )}
    </form>
  );
};

const PasswordForgetLink = () => (
  <Typography variant="body1" gutterBottom>
    <Link to={ROUTES.PASSWORD_FORGET}>¿Olvidaste tu contraseña?</Link>
  </Typography>
);

export default PasswordForgetForm;

export { PasswordForgetLink };
