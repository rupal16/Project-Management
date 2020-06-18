import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import TrelloCard from '../TrelloCard';
import ActionButton from '../actionButton';

import './style.scss';
const TrelloList = ({ title, cards, listId, index }) => {
  return (
    <Draggable draggableId={String(listId)} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          lassName="taskList"
        >
          <Droppable droppableId={String(listId)}>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div>{title}</div>

                {cards.map((card, index) => (
                  <TrelloCard
                    key={card.id}
                    index={index}
                    text={card.text}
                    id={card.id}
                  />
                ))}
                <ActionButton listId={listId} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default TrelloList;
