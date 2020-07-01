import React, { Component } from 'react';
import TrelloList from '../../components/TrelloList';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import ActionButton from '../../components/actionButton';
import {
  fetchAllListsRequest,
  updateProjectRequest,
  sort,
} from '../../actions';
import Navbar from '../../components/navBar';

import './style.scss';

class OpenProject extends Component {
  // constructor(props) {
  //   super(props);

  // componentDidMount() {//api call
  //   this.props.requestProject(this.props.match.params.id);
  // }

  componentDidMount = () => {
    this.props.click();
  };

  state = {
    projectTitle: this.props.projectTitle,
    projectDescription: this.props.projectDescription,
  };
  // }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    console.log('resultt', result);

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

  onBlurHandler = e => {
    // this.handleChange();

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
              value={this.state.projectTitle}
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
              value={this.state.projectDescription}
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
                {this.props.listsReducer.list.map((list, index) => (
                  <TrelloList
                    listId={list}
                    key={list.id}
                    title={list.title}
                    // cards={this.props.listsReducer.lists[list].cards}
                    index={index}
                  />
                ))}
                <ActionButton list projectId={this.props.match.params.id} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    projectTitle:
      state.userProject.projects[props.match.params.id].projectTitle,
    projectDescription:
      state.userProject.projects[props.match.params.id].projectDescription,
    listsReducer: state.listsReducer,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    // requestProject: id => {
    //   dispatch(fetchProjectByIdRequest(id));
    // },

    update: (id, projectTitle, projectDesignation) => {
      dispatch(updateProjectRequest(id, projectTitle, projectDesignation));
    },

    click: () => {
      dispatch(fetchAllListsRequest(props.match.params.id));
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
