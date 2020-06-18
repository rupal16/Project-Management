import React from 'react';

import TrelloCard from '../TrelloCard';
import ActionButton from '../actionButton';

import './style.scss';
const TrelloList = ({ title, cards, listId }) => {
  return (
    <div className="taskList">
      <div>{title}</div>
      {/* <TrelloCard cardTitle="task 1" />
      <TrelloCard cardTitle="task 2" />
      <TrelloCard cardTitle="task 3" /> */}

      {cards.map(card => (
        <TrelloCard key={card.id} text={card.text} />
      ))}
      <ActionButton listId={listId} />
    </div>
  );
};

export default TrelloList;
