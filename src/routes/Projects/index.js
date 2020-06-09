import React, { Component } from 'react';
import { connect } from 'react-redux';

import Sidebar from '../../components/sideBar';
import Input from '../../components/Input';
import { createProjectRequest } from '../../actions';

import './style.scss';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    const { projectTitle, projectDescription } = this.state;
    return (
      <div>
        <div>
          <Sidebar page="projects" />
        </div>
        {/* <div className="cards">
          <Card>
            <Card.Header as="h5">Project Name</Card.Header>
            <Card.Body>
              <Card.Title>Project Description</Card.Title>
              <Card.Text>Description</Card.Text>
              <Button variant="primary" className="button">
                Open Project
              </Button>
            </Card.Body>
          </Card>
          <Button variant="primary" className="addproject button">
            <FontAwesome name="plus" /> Create New Project
          </Button> */}
        {/* </div> */}
        <form className="project-form">
          <div>
            <Input
              labelname="Project Title"
              type="text"
              name="projectTitle"
              placeholder=" Project Title"
              handleChange={this.handleChange}
              value={projectTitle}
            />
          </div>
          <div>
            <Input
              labelname="Project Description"
              type="text"
              name="projectDescription"
              placeholder=" Project Description"
              handleChange={this.handleChange}
              value={projectDescription}
            />
          </div>
          <button
            onClick={e => {
              e.preventDefault();
              console.log('calling createProject');
              console.log('e target', this.state.projectTitle);
              this.props.createProject(
                this.state.projectTitle,
                this.state.projectDescription,
              );
            }}
          >
            Create project
          </button>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {
  return {
    createProject: (projectTitle, projectDescription) => {
      dispatch(createProjectRequest(projectTitle, projectDescription));
    },
  };
};

export default connect(null, mapDispatchToProps)(Projects);
