import React from 'react';

import TrelloCard from '../TrelloCard';

import './style.scss';
const TrelloList = ({ title }) => {
  return (
    <div className="taskListContainer">
      <div>{title}</div>
      <TrelloCard cardTitle="task 1" />
      <TrelloCard cardTitle="task 2" />
      <TrelloCard cardTitle="task 3" />
    </div>
  );
};

export default TrelloList;
