import React, { Component } from 'react';
import { connect } from 'react-redux';

import Sidebar from '../../components/sideBar';
import Input from '../../components/Input';
import { createProjectRequest } from '../../actions';

import {
  fetchAllProjects,
  fetchProjectById,
  removeProject,
  updateProject,
} from '../../services/user.project';

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

  fetchAllHandler = e => {
    e.preventDefault();
    fetchAllProjects();
  };

  fetchProjectById = e => {
    e.preventDefault();
    fetchProjectById('-M9OJNXNCNCl_C90CawH');
  };

  deleteProjectById = e => {
    e.preventDefault();
    removeProject('-M9OJNXNCNCl_C90CawH');
  };

  updateProject = e => {
    e.preventDefault();
    updateProject('-M9OMQqwdvMNTSK4FK-0', 'rupal');
  };

  render() {
    const { projectTitle, projectDescription } = this.state;
    return (
      <div>
        <div>
          <Sidebar page="projects" />
        </div>
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

              this.props.createProject(
                this.state.projectTitle,
                this.state.projectDescription,
              );
            }}
          >
            Create project
          </button>
          <button onClick={this.fetchAllHandler}>Fetch All projects</button>
          <button onClick={this.fetchProjectById}>Fetch Project bY id</button>
          <button onClick={this.deleteProjectById}>Delete by Id</button>
          <button onClick={this.updateProject}>Update</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: (projectTitle, projectDescription) => {
      dispatch(createProjectRequest(projectTitle, projectDescription));
    },
  };
};

export default connect(null, mapDispatchToProps)(Projects);
