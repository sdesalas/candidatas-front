import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import { firebase } from '../../firebase';
import * as routes from '../../constants/routes';

const withAuthorization = authCondition => Component => {
  const WithAuthorization = props => {
    useEffect(() => {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          props.history.push(routes.LANDING);
        }
      });
    }, []);

    return (
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? <Component authUser={authUser} {...props} /> : null
        }
      </AuthUserContext.Consumer>
    );
  };

  WithAuthorization.propTypes = {
    history: PropTypes.object.isRequired,
  };

  return withRouter(WithAuthorization);
};

export default withAuthorization;
