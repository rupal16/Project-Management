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
    console.log('e from onblur', e);
    console.log('props', this.props);
    console.log('state', this.state);
    this.props.update(
      this.props.match.params.id,
      this.state.projectTitle,
      this.state.projectDescription,
    );
  };

  render() {
    console.log('lists from open roject', this.props.listsReducer.lists);
    console.log('this.props', this.props);
    console.log('this.state', this.state);
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
                {console.log(
                  'listReducer',
                  Object.keys(this.props.listsReducer.lists),
                )}

                {Object.keys(this.props.listsReducer.lists)
                  .filter(
                    listId =>
                      this.props.listsReducer.lists[listId].projectId ===
                      this.props.match.params.id,
                  )
                  .map((list, index) => (
                    <TrelloList
                      listId={list}
                      key={this.props.listsReducer.lists[list].id}
                      title={this.props.listsReducer.lists[list].title}
                      cards={this.props.listsReducer.lists[list].cards}
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

const mapDispatchToProps = dispatch => {
  return {
    // requestProject: id => {
    //   dispatch(fetchProjectByIdRequest(id));
    // },

    update: (id, projectTitle, projectDesignation) => {
      dispatch(updateProjectRequest(id, projectTitle, projectDesignation));
    },

    click: () => {
      dispatch(fetchAllListsRequest());
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
