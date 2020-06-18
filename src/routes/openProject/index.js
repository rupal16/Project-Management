import React, { Component } from 'react';
import TrelloList from '../../components/TrelloList';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import ActionButton from '../../components/actionButton';
import {
  fetchProjectByIdRequest,
  updateProjectRequest,
  sort,
} from '../../actions';
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

  onDragEnd = result => {
    console.log('on drag end fired');
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    // this.props.dispatch(
    //   sort(
    //     source.droppableId,
    //     destination.droppableId,
    //     source.index,
    //     destination.index,
    //     draggableId,
    //   ),
    // );
    this.props.drag(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
    );
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
    // const { lists } = this.props;
    return (
      <div className="projectViewBg">
        <Navbar />
        <div className="top-menu-bar">
          <TextField
            className="textfield"
            margin="dense"
            id="projectTitle"
            name="projectTitle"
            type="text"
            value={this.props.projectTitle}
            onChange={this.handleChange}
            onBlur={this.onBlurHandler}
            // onFocus={this.onFocusHandler}
          />
          <br />

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
        <br />
        {/* <div className="list">
          <TrelloList title="todo" />
          <TrelloList title="doing" />
          <TrelloList title="done" />
          <TrelloList title="list 4" />
        </div> */}
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="list-view">
            {this.props.listsReducer.map(list => (
              <TrelloList
                listId={list.id}
                key={list.id}
                title={list.title}
                cards={list.cards}
              />
            ))}
            <ActionButton list />
          </div>
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
    ) =>
      dispatch(
        sort(
          sourcedroppableId,
          destinationdroppableId,
          sourceindex,
          destinationindex,
          draggableId,
        ),
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenProject);
