import React from 'react';
import PropTypes from 'prop-types';

import { userSignOut } from '../../services/user-service';

class Dashboard extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isProfile: false,
    };
  }

  handleClick = async () => {
    await userSignOut();
  };

  // profileHandler = async () => {
  //   try {
  //     await getDetails();
  //     this.setState({
  //       isProfile: true,
  //     });
  //   } catch (error) {}
  // };

  render() {
    // const { isProfile } = this.state;
    return (
      <div>
        <h1>Welcome to Dashboard!</h1>
        <button onClick={this.handleClick}>SignOut</button>
        <button onClick={this.profileHandler}>Profile page</button>
        {/* {isProfile && <Profile />} */}
      </div>
    );
  }
}

export default Dashboard;
