import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withAuthorization from '../auth/withAuthorization';
import moment from 'moment';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

import './Home.css';

import avatar from '../../images/avatar.jpg';

const HomePage = ({ authUser }) => {
  const [candidates, setCandidates] = useState([]);
  const [filter, setFilter] = useState('');

  if (!candidates.length) {
    fetch('//us-central1-candidatas-front-490dd.cloudfunctions.net/candidates')
      .then(r => r.json())
      .then(data => {
        setCandidates(data.result);
      });
  }

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  const filteredCandidates = candidates.filter(
    val =>
      !filter ||
      (val && val.nombre && val.nombre.match(new RegExp(filter, 'gi')))
  );

  return (
    <div>
      <div className="welcome">
        <p className="hello-message">
          Hola <em>{authUser.email}!</em>
        </p>
        <input
          className="searchbar"
          placeholder="Filtrar candidatas..."
          onChange={handleFilter}
          value={filter}
        />
      </div>
      <Paper className="data">
        <List className="list"> 
          {filteredCandidates.length ? (
            filteredCandidates.map(c => (
              <ListItem
                key={c.email}
                alignItems="flex-start"
                className="card-item"
              >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <p>
                        <strong>{c.nombre}</strong> ({c.email})
                      </p>
                      <dl>
                        <dd>Edad</dd>
                        <dt>
                          {c.edad} ({moment(c.fecha_nacimiento).format('DD MMM YYYY')})
                        </dt>
                        <dd>Codigo Postal</dd>
                        <dt>{c.cp}</dt>
                      </dl>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))
          ) : (
            <p className="status-message">
              {candidates.length === 0
                ? 'Cargando candidatas...'
                : 'No hay candidatas con ese nombre.'}
            </p>
          )}
        </List>
      </Paper>
    </div>
  );
};

HomePage.propTypes = {
  authUser: PropTypes.object.isRequired,
};

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage);
