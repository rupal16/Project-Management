import React from 'react';
import { Card } from 'react-bootstrap';
import CloseIcon from '@material-ui/icons/Close';
import { Draggable } from 'react-beautiful-dnd';

import './style.scss';

const TrelloCard = props => {
  return (
    <Draggable draggableId={String(props.id)} index={props.index}>
      {provided => (
        <div
          className="trello-cards"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <Card.Body>
              {props.text}
              <CloseIcon className="cancel-btn" />
            </Card.Body>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TrelloCard;
