import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';

// import history from '../../utils/history';
import { removeProjectRequest } from '../../actions';

import './style.scss';

const ProjectCard = props => {
  const dispatch = useDispatch();

  const openHandler = () => {
    let id = props.id;
    // console.log('historyy', props.history);
    props.history.push(`/dashboard/projects/${id}`);
  };

  const remove = () => {
    let id = props.id;

    dispatch(removeProjectRequest(id));
    // props.history.push(`/dashboard`);
  };

  return (
    <div className="project-card">
      {/* <Card.Title>Project Title</Card.Title> */}
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

export default connect(null, null)(withRouter(ProjectCard));
