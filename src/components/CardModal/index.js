import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

import './style.scss';

class CardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      newText: this.props.text,
      listTitle: this.props.listTitle,
    };
  }

  handleClose = () => {
    this.props.onUpdate();
    this.setState({
      open: false,
    });
  };

  handleChange = e => {
    this.setState({
      newText: e.target.value,
    });
  };

  onBlurHandler = () => {
    const { updateCallBack } = this.props;
    updateCallBack(this.state.newText);
  };

  render() {
    return (
      <div>
        <Modal show={this.state.open}>
          <Modal.Header>
            <Modal.Title>{this.state.listTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              defaultValue={this.state.newText}
              onChange={this.handleChange}
              onBlur={this.onBlurHandler}
            />
            <div className="add-to-card">
              <button>Members</button>
              <button>Delete Card</button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CardModal;
