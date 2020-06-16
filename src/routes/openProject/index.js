import React, { Component } from 'react';
import TrelloList from '../../components/TrelloList';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

import { updateProjectRequest } from '../../actions';
import Navbar from '../../components/navBar';

import './style.scss';

class OpenProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      projectTitle: this.props.projectTitle,
      projectDescription: this.props.projectDescription,
      updateProject: false,
    };
  }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  menuHandler = e => {
    console.log('showmenu', this.state.showMenu);
    e.preventDefault();
    this.setState({
      showMenu: true,
    });
    console.log('showmenu', this.state.showMenu);
  };

  render() {
    const { updateProject } = this.state;
    return (
      <div className="projectViewBg">
        <Navbar />
        <div className="top-menu-bar">
          <p
            className="project-title"
            onClick={() => {
              this.setState({
                updateProject: true,
              });
              console.log('updating details');
              this.props.click(
                this.state.projectTitle,
                this.state.projectDescription,
              );
            }}
          >
            Title
          </p>
          {updateProject && (
            <TextField
              margin="dense"
              id="firstName"
              name="firstName"
              label="FirstName"
              type="text"
              fullWidth
              value={this.state.projectTitle}
              onChange={this.handleChange}
            />
          )}
        </div>
        <br />
        <div className="list">
          <TrelloList title="todo" />
          <TrelloList title="doing" />
          <TrelloList title="done" />
          <TrelloList title="list 4" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projectTitle: state.userProject.projectTitle,
    projectDescription: state.userProject.projectDescription,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    click: (projectTitle, projectDescription) => {
      dispatch(updateProjectRequest(projectTitle, projectDescription));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenProject);
