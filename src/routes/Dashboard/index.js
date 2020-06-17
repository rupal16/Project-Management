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
            {/* (this.props.projects).map */}
            {/* {Object.values(this.props.projects).map(project => (
              <ProjectCard
              id={}
                projectTitle={project.title.projectTitle}
                projectDescription={project.title.projectDescription}
                members="members"
              />
            ))} */}

            {Object.keys(this.props.projects).map(key => (
              <ProjectCard
                // id={key}
                // projectTitle={this.props.projects[key].title.projectTitle}
                // projectDescription={
                //   this.props.projects[key].title.projectDescription
                // }
                id={key}
                // projectTitle={this.props.projects[key].title.projectTitle}
                projectTitle={this.props.projects[key].projectTitle}
                projectDescription={
                  // this.props.projects[key].title.projectDescription
                  this.props.projects[key].projectDescription
                }
                handleChange={this.handleChange}
              />
            ))}
          </div>
        </div>
        {/* <div>
          <button onClick={this.handleClick}>SignOut</button>
          <button onClick={this.profileHandler}>Profile page</button>
        </div> */}
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

// const mapDispatchToProps = dispatch => {
//   return {
//     click: (firstName, lastName, email, phone) => {
//       dispatch(editUserDetails(firstName, lastName, email, phone));
//     },
//   };
// };

// class ProjectsList extends Component {
//   render() {
//     return (

//     );
//   }
// }

// export default ProjectsList;
