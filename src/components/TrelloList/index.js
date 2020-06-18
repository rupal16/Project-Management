import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import TrelloCard from '../TrelloCard';
import ActionButton from '../actionButton';

import './style.scss';
const TrelloList = ({ title, cards, listId }) => {
  return (
    <Droppable droppableId={String(listId)}>
      {provided => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          lassName="taskList"
        >
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
  );
};

export default TrelloList;
