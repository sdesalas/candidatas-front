import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../../constants/routes';
import { auth } from '../../firebase';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import './SignIn.css';

const SignUpForm = ({ history }) => {
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = event => {
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => history.push(routes.HOME))
      .catch(error => setError(error));

    event.preventDefault();
  };

  const isInvalid =
    passwordOne !== passwordTwo || passwordOne === '' || email === '';

  return (
    <form onSubmit={onSubmit} className="form">
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={event => setEmail(event.target.value)}
        type="email"
        placeholder="nombre.apellido@example.com"
      />
      <TextField
        fullWidth
        label="Contraseña"
        value={passwordOne}
        onChange={event => setPasswordOne(event.target.value)}
        type="password"
        placeholder="secret"
      />
      <TextField
        fullWidth
        label="Confirmar Contraseña"
        value={passwordTwo}
        onChange={event => setPasswordTwo(event.target.value)}
        type="password"
        placeholder="secret again"
      />
      <Button
        variant="contained"
        color="primary"
        disabled={isInvalid}
        onClick={onSubmit}
        className="button--submit"
      >
        Regístrate
      </Button>
      {error && (
        <Typography variant="body1" gutterBottom>
          {error.message}
        </Typography>
      )}
    </form>
  );
};

SignUpForm.propTypes = {
  history: PropTypes.object.isRequired,
};

const SignUpLink = () => (
  <Typography variant="body1" gutterBottom>
    ¿No tienes cuenta? <Link to={routes.SIGN_UP}>Regístrate</Link>
  </Typography>
);

export default withRouter(SignUpForm);
export { SignUpLink };
