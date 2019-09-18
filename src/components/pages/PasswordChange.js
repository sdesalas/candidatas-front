import React, { useState } from 'react';

import { auth } from '../../firebase';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const PasswordChangeForm = () => {
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [error, setError] = useState(null);

  const setInitialState = () => {
    setPasswordOne('');
    setPasswordTwo('');
    setError(null);
  };

  const onSubmit = event => {
    auth
      .doPasswordUpdate(passwordOne)
      .then(() => setInitialState())
      .catch(error => setError(error));

    event.preventDefault();
  };

  const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

  return (
    <form className="form">
      <TextField
        fullWidth
        label="Nueva Contraseña"
        value={passwordOne}
        onChange={event => setPasswordOne(event.target.value)}
        type="password"
        placeholder="secret"
      />
      <TextField
        fullWidth
        label="Confirma Contraseña"
        value={passwordTwo}
        onChange={event => setPasswordTwo(event.target.value)}
        type="password"
        placeholder="secret again"
      />
      <Button
        variant="outlined"
        disabled={isInvalid}
        onClick={onSubmit}
        className="button--submit"
      >
        Cambiar Mi Contraseña
      </Button>

      {error && (
        <Typography variant="body1" gutterBottom>
          {error.message}
        </Typography>
      )}
    </form>
  );
};

export default PasswordChangeForm;
