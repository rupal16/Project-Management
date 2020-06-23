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
  // state = {
  //   open: true,
  //   newText: this.props.text,
  //   listTitle: this.props.listTitle,
  // };

  handleClose = () => {
    console.log('newtext', this.state.newText);
    this.props.onUpdate();
    this.setState({
      open: false,
    });
  };

  // changeHandler = e => {
  //   console.log('e', e);
  //   const { newText } = this.state;
  //   console.log('change hanlder', newText);
  //   const { value, name } = e.target;
  //   this.setState({
  //     [name]: value,
  //   });
  // };
  handleChange = e => {
    // const { value, name } = e.target;
    // this.setState({
    //   [name]: value,
    // });
    // const { newText } = this.state;
    this.setState({
      newText: e.target.value,
    });
  };

  onBlurHandler = () => {
    const { updateCallBack } = this.props;
    updateCallBack(this.state.newText);
  };

  // onBlurHandler = () => {
  //   this.props.update(
  //     this.props.match.params.id,
  //     this.state.projectTitle,
  //     this.state.projectDescription,
  //   );
  // };

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
