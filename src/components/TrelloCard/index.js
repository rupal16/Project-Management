import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import CardModal from '../CardModal';

import { Draggable } from 'react-beautiful-dnd';

import './style.scss';

// let cardClicked = false;

// const clickHandler = () => {
//   console.log(cardClicked);
//   console.log('clicked');
//   cardClicked = true;
//   console.log(cardClicked);
// };

// useEffect(() => {
//   dispatch(requestUser());
// }, []);

const TrelloCard = props => {
  const [isUpdate, setUpdate] = useState(false);

  const handleUpdateComplete = () => {
    setUpdate(false);
  };

  const updateCallBack = newText => {
    console.log('update callback', newText);
  };

  console.log('from card', props.listTitle);
  return (
    <Draggable draggableId={String(props.id)} index={props.index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card
            className="trelloCards"
            onClick={() => {
              setUpdate(true);
            }}
          >
            <Card.Body>{props.text}</Card.Body>
          </Card>
          {isUpdate && (
            <CardModal
              onUpdate={handleUpdateComplete}
              text={props.text}
              listTitle={props.listTitle}
              updateCallBack={updateCallBack}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TrelloCard;
