import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ErrorModal = props => {
  return (
    <div>
      <Modal show={props.showError} size="md" centered>
        <Modal.Body>
          <p>{props.errorContent}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onClick}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ErrorModal;
