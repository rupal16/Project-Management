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
    this.setState({
      text: '',
    });
    if (this.state.text) {
      this.props.addList(this.props.listId, this.state.text);
    }

    return;
  };

  handleAddCard = () => {
    const { dispatch, listId } = this.props;
    const { text } = this.state;

    this.setState({
      text: '',
    });
    if (text) {
      dispatch(addCardRequest(listId, text));
    }
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

const mapDispatchToProps = dispatch => {
  return {
    addList: (listId, text) => {
      dispatch(addListRequest(listId, text));
    },
  };
};

export default connect(null, mapDispatchToProps)(ActionButton);
