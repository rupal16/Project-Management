import React from 'react';
import { Card } from 'react-bootstrap';
import CloseIcon from '@material-ui/icons/Close';

import './style.scss';

const TrelloCard = props => {
  return (
    <div className="trello-cards">
      <Card>
        <Card.Body>
          {props.cardTitle}
          <CloseIcon className="cancel-btn" />
        </Card.Body>
      </Card>
    </div>
  );
};

export default TrelloCard;
