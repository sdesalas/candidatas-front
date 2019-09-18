import React from 'react';
import logo from '../../images/logo-adalab.png';
import PropTypes from 'prop-types';

import './Landing.scss';

const Landing = ({ children }) => (
  <div className="Landing">
    <header className="Landing-header">
      <h1>Candidatas Adalab</h1>
      <p>Realiza aquí el proceso de selección para entrar en Adalab.</p>
    </header>
    <main className="grow layout">{children}</main>
    <footer className="Landing-footer">
      <img src={logo} className="Landing-logo" alt="logo de Adalab" />
    </footer>
  </div>
);

Landing.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default Landing;
