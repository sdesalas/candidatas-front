import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withAuthorization from '../auth/withAuthorization';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const HomePage = ({ authUser }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, tabIndex) => {
    setTabIndex(tabIndex);
  };

  return (
    <div>
      <Tabs
        onChange={handleChange}
        value={tabIndex}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="1" />
        <Tab label="2" />
        <Tab label="3" />
      </Tabs>

      <p>Hi {authUser.email}!</p>
    </div>
  );
};

HomePage.propTypes = {
  authUser: PropTypes.object.isRequired,
};

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage);
