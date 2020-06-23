import React, { Component } from 'react';
import TrelloList from '../../components/TrelloList';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import ActionButton from '../../components/actionButton';
import {
  fetchProjectByIdRequest,
  updateProjectRequest,
  sort,
} from '../../actions';
import Navbar from '../../components/navBar';

import './style.scss';

class OpenProject extends Component {
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

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.drag(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type,
    );
  };

  onBlurHandler = () => {
    this.props.update(
      this.props.match.params.id,
      this.state.projectTitle,
      this.state.projectDescription,
    );
  };

  render() {
    return (
      <div className="projectViewBg">
        <Navbar />
        <div className="top-menu-bar">
          <div className="project">
            <p className="project-label">Project Title</p>
            <TextField
              className="textfield"
              margin="dense"
              id="projectTitle"
              name="projectTitle"
              type="text"
              value={this.props.projectTitle}
              onChange={this.handleChange}
              onBlur={this.onBlurHandler}
            />
          </div>

          <br />
          <div className="project">
            <p className="project-label">Project Description</p>
            <TextField
              className="textfield"
              margin="dense"
              id="projectDescription"
              name="projectDescription"
              type="text"
              value={this.props.projectDescription}
              onChange={this.handleChange}
              onBlur={this.onBlurHandler}
            />
          </div>
        </div>
        <br />

        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {provided => (
              <div
                className="list-view"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {this.props.listsReducer.map((list, index) => (
                  <TrelloList
                    listId={list.id}
                    key={list.id}
                    title={list.title}
                    cards={list.cards}
                    index={index}
                  />
                ))}
                <ActionButton list />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projectTitle: state.userProject.projectTitle,
    projectDescription: state.userProject.projectDescription,
    listsReducer: state.listsReducer,
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

    drag: (
      sourcedroppableId,
      destinationdroppableId,
      sourceindex,
      destinationindex,
      draggableId,
      type,
    ) =>
      dispatch(
        sort(
          sourcedroppableId,
          destinationdroppableId,
          sourceindex,
          destinationindex,
          draggableId,
          type,
        ),
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenProject);
