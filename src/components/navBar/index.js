import React, { Component } from 'react';
import { Nav, Navbar, Modal, Button, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createProjectRequest, fetchAllProjectsRequest } from '../../actions';

import { withRouter } from 'react-router';

import { userSignOut } from '../../services/user-service';

import Input from '../Input';

import './style.scss';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createProject: false,
      projectTitle: '',
      projectDescription: '',
    };
  }

  componentDidMount = () => {
    this.props.click();
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  signOutHandler = async () => {
    await userSignOut();
  };

  createProjectClicked = () => {
    this.setState({
      createProject: true,
    });
  };

  render() {
    const { createProject, projectTitle, projectDescription } = this.state;
    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="light"
          variant="light"
          fixed="top"
          className="navbar-wrap"
        >
          <Navbar.Brand href="/dashboard">Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={this.createProjectClicked}>
                Create Project
              </Nav.Link>
              {this.props.projects ? (
                <NavDropdown title="Projects" id="collasible-nav-dropdown">
                  {Object.keys(this.props.projects).map(key => (
                    <NavDropdown.Item
                      id={key}
                      onClick={() => {
                        this.props.history.push(`/dashboard/projects/${key}`);
                      }}
                    >
                      {this.props.projects[key].projectTitle}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ) : (
                <NavDropdown title="Projects" id="collasible-nav-dropdown" />
              )}
            </Nav>
            <Nav>
              <Nav.Link href="/user-profile">Profile</Nav.Link>
              <Nav.Link eventKey={2} onClick={this.signOutHandler}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {createProject && (
          <Modal show={this.state.createProject} size="sm" centered>
            <Modal.Body>
              <div>
                <Input
                  labelname="Project Title"
                  type="text"
                  name="projectTitle"
                  placeholder="Project Title"
                  handleChange={this.handleChange}
                  value={projectTitle}
                />
              </div>
              <div>
                <Input
                  labelname="Project Description"
                  type="text"
                  name="projectDescription"
                  placeholder="Project Description"
                  handleChange={this.handleChange}
                  value={projectDescription}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={e => {
                  e.preventDefault();

                  this.props.createNewProject(
                    this.state.projectTitle,
                    this.state.projectDescription,
                  );
                  this.setState({
                    createProject: false,
                  });
                }}
              >
                Create
              </Button>
              <Button
                onClick={() => {
                  this.setState({ createProject: false });
                  return <Redirect to="/dashboard" />;
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.userProject.projects,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNewProject: (projectTitle, projectDescription) => {
      dispatch(createProjectRequest(projectTitle, projectDescription));
    },
    click: () => {
      dispatch(fetchAllProjectsRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
