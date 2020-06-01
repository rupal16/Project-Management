import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { userSignOut } from '../../services/user-service';

class Dashboard extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  handleClick = async () => {
    await userSignOut();
  };

  render() {
    return (
      <div>
        <h1>Welcome to Dashboard!</h1>
        <button onClick={this.handleClick}>SignOut</button>
      </div>
    );
  }
}

export default withRouter(Dashboard);
