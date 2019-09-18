import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import './SignIn.css';

const SignInForm = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const setInitialState = () => {
    setEmail('');
    setPassword('');
    setError(null);
  };

  const onSubmit = event => {
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setInitialState(history);
        history.push(routes.HOME);
      })
      .catch(error => setError(error));

    event.preventDefault();
  };

  const isInvalid = password === '' || email === '';

  return (
    <form className="form container">
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={event => setEmail(event.target.value)}
        type="email"
        placeholder="ines@adalab.es"
      />
      <TextField
        fullWidth
        label="Password"
        value={password}
        onChange={event => setPassword(event.target.value)}
        type="password"
        placeholder="secret"
      />
      <Button
        variant="contained"
        color="primary"
        disabled={isInvalid}
        onClick={onSubmit}
        className="button--submit"
      >
        Acceder
      </Button>
      {error && (
        <Typography variant="body1" gutterBottom>
          {error.message}
        </Typography>
      )}
    </form>
  );
};

SignInForm.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(SignInForm);
