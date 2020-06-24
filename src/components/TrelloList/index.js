import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import TrelloCard from '../TrelloCard';
import ActionButton from '../actionButton';

import './style.scss';

const TrelloList = ({ title, cards, listId, index }) => {
  const [isUpdate, setUpdate] = useState(false);

  const clickHandler = () => {
    setUpdate(true);
  };

  const blurHandler = () => {
    setUpdate(false);
  };

  return (
    <div>
      <Draggable draggableId={String(listId)} index={index}>
        {provided => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            className="taskList"
          >
            <Droppable droppableId={String(listId)}>
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {isUpdate ? (
                    <input
                      type="text"
                      defaultValue={title}
                      onBlur={blurHandler}
                    />
                  ) : (
                    <div onClick={clickHandler}>{title}</div>
                  )}

                  {cards.map((card, index) => (
                    <TrelloCard
                      listTitle={title}
                      key={card.id}
                      index={index}
                      text={card.text}
                      id={card.id}
                    />
                  ))}
                  <ActionButton listId={listId} index={index} />

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default TrelloList;
