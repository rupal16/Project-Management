import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';

import history from '../../utils/history';
import { removeProjectRequest } from '../../actions';

import './style.scss';

// propTypes = {
//   history: PropTypes.object.isRequired,
// };
const ProjectCard = props => {
  const dispatch = useDispatch();
  console.log('props', props);
  console.log('id', props.id);
  let id = props.id;
  console.log('iidd', id);
  console.log('title', props.projectTitle);
  // const openHandler = () => {
  //   console.log('open');
  //   console.log('props id', props.id);
  // };

  // const removeHandler = () => {
  //   removeHandler(props.id);
  //   console.log('remove ');
  // };
  // onClick={() => {
  //   this.props.click(
  //     this.state.firstName,
  //     this.state.lastName,
  //     this.state.email,
  //     this.state.phone,
  //   );

  const openHandler = () => {
    let id = props.id;
    console.log('open id', id);
    console.log('open button clicked');
    history.push(`/dashboard/projects/${id}`);
  };

  const remove = () => {
    let id = props.id;
    console.log('id inside remove', id);
    console.log('inside remove');
    dispatch(removeProjectRequest(id));
  };

  return (
    <div className="project-card">
      <Card className="a">
        <Card.Header>
          <TextField
            margin="dense"
            id="projectTitle"
            name="projectTitle"
            label="Project Title"
            type="text"
            fullWidth
            value={props.projectTitle}
            onChange={props.handleChange}
          />
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <TextField
              margin="dense"
              id="projectDescription"
              name="projectDescription"
              label="Project Description"
              type="text"
              fullWidth
              value={props.projectDescription}
              onChange={props.handleChange}
            />
          </Card.Title>
          <hr />
          <Card.Text>{props.members}</Card.Text>
          <Button className="project-btn" onClick={openHandler}>
            Open
          </Button>
          <Button className="project-btn" onClick={remove}>
            Remove
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

// const mapDispatchToProps = dispatch => {
//   return {
//     removeHandler: id => {
//       dispatch(removeProjectRequest(id));
//     },
//   };
// };

export default connect(null, null)(withRouter(ProjectCard));
