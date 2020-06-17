import React, { Component } from 'react';
import TrelloList from '../../components/TrelloList';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

import { fetchProjectByIdRequest, updateProjectRequest } from '../../actions';
import Navbar from '../../components/navBar';

import './style.scss';

class OpenProject extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     project: this.props.projects[`${this.props.match.params.id}`],
  //   };
  // }

  componentDidMount() {
    this.props.requestProject(this.props.match.params.id);
  }

  state = {
    projectTitle: this.props.projectTitle,
    projectDesignation: this.props.projectDesignation,
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onBlurHandler = () => {
    this.props.update(
      this.props.match.params.id,
      this.state.projectTitle,
      this.state.projectDescription,
    );
    // this.props.click(this.props.projectTitle, this.props.projectDescription);
  };

  render() {
    return (
      <div className="projectViewBg">
        <Navbar />
        <div className="top-menu-bar">
          <TextField
            margin="dense"
            id="projectTitle"
            name="projectTitle"
            type="text"
            fullWidth
            value={this.props.projectTitle}
            onChange={this.handleChange}
            onBlur={this.onBlurHandler}
            // onFocus={this.onFocusHandler}
          />
          <br />
          <TextField
            margin="dense"
            id="projectDescription"
            name="projectDescription"
            type="text"
            fullWidth
            value={this.props.projectDescription}
            onChange={this.handleChange}
            onBlur={this.onBlurHandler}
          />
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
    // projects: state.userProject.projects,
    projectTitle: state.userProject.projectTitle,
    projectDescription: state.userProject.projectDescription,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestProject: id => {
      dispatch(fetchProjectByIdRequest(id));
    },

    update: (id, projectTitle, projectDesignation) => {
      dispatch(updateProjectRequest(id, projectTitle, projectDesignation));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenProject);
