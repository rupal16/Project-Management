import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';

import FontAwesome from 'react-fontawesome';

import './style.scss';

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = { activeKey: props.page };
  }

  render() {
    return (
      <div className="menuContainer">
        <div className="menubar">
          <h1>User Profile</h1>
          <div className="avatar">
            <FontAwesome name="user" />
            <h3>UserName</h3>
            <h3>Designation</h3>
          </div>
          <div className="options">
            <Nav
              variant="tabs"
              activeKey={this.state.activeKey}
              className="flex-column"
            >
              <Nav.Link
                eventKey="profile"
                href="/user-profile"
                className="option"
              >
                User Information
              </Nav.Link>
              <Nav.Link
                eventKey="teams"
                href="/user-profile/teams"
                className="option"
              >
                Teams
              </Nav.Link>
              <Nav.Link
                eventKey="projects"
                href="/user-profile/projects"
                className="option"
              >
                Projects
              </Nav.Link>
              <Nav.Link
                eventKey="settings"
                href="/user-profile/account-settings"
                className="option"
              >
                Account Settings
              </Nav.Link>
              <Nav.Link
                eventKey="help"
                href="/user-profile/help"
                className="option"
              >
                Help
              </Nav.Link>
              <Nav.Link
                eventKey="logout"
                href="/user-profile/logout"
                className="option"
              >
                Log Out
              </Nav.Link>
              <Nav.Link
                eventKey="removeAccount"
                href="/user-profile/remove-account"
                className="option"
              >
                Remove Account
              </Nav.Link>
            </Nav>
          </div>
        </div>
      </div>
    );
  }
}

export default SideNav;
