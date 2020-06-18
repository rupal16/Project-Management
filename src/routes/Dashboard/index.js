import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ProjectCard from '../../components/projectCard';
import { fetchAllProjectsRequest } from '../../actions';
import NavBar from '../../components/navBar';

import { userSignOut } from '../../services/user-service';

import './style.scss';

class Dashboard extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.project = [];
  }

  componentDidMount = () => {
    this.props.click();
  };

  state = {
    projectTitle: this.props.projectTitle,
    projectDescription: this.props.projectDescription,
  };

  handleClick = async () => {
    await userSignOut();
  };

  removeProjectHandler = event => {};

  handleChange = e => {
    const { value, name } = e.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <NavBar />
        <div className="project-list-wrap">
          <div className="projects-list">
            {Object.keys(this.props.projects).map(key => (
              <ProjectCard
                id={key}
                projectTitle={this.props.projects[key].projectTitle}
                projectDescription={this.props.projects[key].projectDescription}
                handleChange={this.handleChange}
              />
            ))}
          </div>
        </div>
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
    click: () => {
      dispatch(fetchAllProjectsRequest());
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard),
);
