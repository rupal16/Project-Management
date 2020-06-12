import React, { Component } from 'react';
import { Nav, Navbar, Dropdown, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createProjectRequest } from '../../actions';

import Input from '../Input';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createProject: false,
      projectTitle: '',
      projectDescription: '',
    };
  }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  createProjectClicked = () => {
    console.log('create project is clicked');
    this.setState({
      createProject: true,
    });
  };

  render() {
    const { createProject, projectTitle, projectDescription } = this.state;
    console.log('create', createProject);
    return (
      <div>
        <Navbar fixed="top" bg="light" variant="light">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={this.createProjectClicked}>
              Create Project
            </Nav.Link>
            <Nav.Link href="#pricing">Profile</Nav.Link>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
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
                  console.log(
                    'project created',
                    this.props.projectTitle,
                    this.props.projectDescription,
                  );
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
              <Button onClick={() => this.setState({ createProject: false })}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createNewProject: (projectTitle, projectDescription) => {
      dispatch(createProjectRequest(projectTitle, projectDescription));
    },
  };
};

export default connect(null, mapDispatchToProps)(NavBar);
