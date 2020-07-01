import React, { Component } from 'react';
import { Add, Close } from '@material-ui/icons';
import { Card, Button } from 'react-bootstrap';
import TextArea from 'react-textarea-autosize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addListRequest, addCardRequest } from '../../actions';

import './style.scss';

class ActionButton extends Component {
  static propTypes = {
    list: PropTypes.object.isRequired,
  };
  state = {
    formOpen: false,
    text: '',
    // listId: this.props.listId,
  };

  openForm = () => {
    this.setState({
      formOpen: true,
    });
  };

  closeForm = e => {
    this.setState({
      formOpen: false,
    });
  };

  handleInputChange = e => {
    this.setState({
      text: e.target.value,
    });
  };

  handleAddList = () => {
    console.log('projectId', this.props.projectId);
    this.setState({
      text: '',
    });
    if (this.state.text) {
      console.log('listid', this.props.listId);
      console.log('porps', this.props, this.state);
      console.log('list props', this.state.text);
      this.props.addList(
        this.state.text,
        this.props.projectId,
        // this.props.listId,
      );
    }

    return;
  };

  handleAddCard = () => {
    // const { listId } = this.props;
    // const { text } = this.state;
    console.log('props from add card', this.props);
    console.log('text card', this.state.text);
    console.log('cardid', this.props.listId);

    if (this.state.text) {
      // console.log('if text exists', props.listId);
      console.log('text', this.state.text);
      console.log('card id', this.state.cardId);
      // dispatch(addCardRequest(listId, text));
      this.props.addCard(this.state.text, this.props.listId);

      // this.props.addCard(this.state.text, this.props.listId);
    }
    this.setState({
      text: '',
    });
  };

  renderAddButton = () => {
    const { list } = this.props;

    const buttonText = list ? 'Add another list' : 'Add another card';

    return (
      <div className="action-button-style" onClick={this.openForm}>
        <Add />
        <p>{buttonText}</p>
      </div>
    );
  };

  renderForm = () => {
    const { list } = this.props;
    const placeholder = list ? 'Enter list title' : 'Enter title for this card';
    const buttonTitle = list ? 'Add List' : 'Add Button';
    return (
      <div>
        <Card className="card-style">
          <Card.Body>
            <TextArea
              className="textarea-style"
              placeholder={placeholder}
              autoFocus
              onBlur={this.closeForm}
              value={this.state.text}
              onChange={this.handleInputChange}
            />
          </Card.Body>
        </Card>
        <div className="form-buttons">
          <Button
            variant="success"
            onMouseDown={list ? this.handleAddList : this.handleAddCard}
          >
            {buttonTitle}
          </Button>
          <Close className="button-close" />
        </div>
      </div>
    );
  };

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

// const mapStateToProps = state = {
//   return
// }

// const mapStateToProps = state => {
//   return {
//     listId: state.listsReducer[0].listId,
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    addList: (text, projectId) => {
      dispatch(addListRequest(text, projectId));
    },

    addCard: (text, listId) => {
      dispatch(addCardRequest(text, listId));
    },
  };
};

export default connect(null, mapDispatchToProps)(ActionButton);
