import React, { useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

// import TrelloCard from '../TrelloCard';
import ActionButton from '../actionButton';
import { updateListTitleRequest, fetchAllCardsRequest } from '../../actions';

import './style.scss';

// const TrelloList = ({ title, cards, listId, index, updateTitle }) => {
const TrelloList = props => {
  const { title, listId, index, updateTitle } = props;
  const [isUpdate, setUpdate] = useState(false);
  const [newTitle, setTitle] = useState({ title });

  useEffect(() => {
    // dispatch(fetchAllCardsRequest());
    props.fetchAllCards();
  }, []);

  const clickHandler = () => {
    console.log('setUpdate');
    setUpdate(true);
  };

  const onChangeHandler = e => {
    console.log('on change handler');

    const { value } = e.target;
    console.log('listid', listId);
    console.log('value', value);
    // console.log('name', name);
    setTitle(value);
    // console.log('newtitle', newTitle);
    // updateTitle(listId, newTitle);
  };

  const blurHandler = () => {
    setUpdate(false);
    console.log('listid, newtitle', listId.id, newTitle);
    updateTitle(listId.id, newTitle);
  };
  // console.log('listid', listId);
  // console.log('props title', this.props);
  console.log('listss', props);
  console.log('listId', listId.id);
  return (
    <div>
      <Draggable draggableId={String(listId.id)} index={index}>
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
                      onChange={onChangeHandler}
                    />
                  ) : (
                    <div onClick={clickHandler}>{title}</div>
                  )}

                  {/* {props.cardsReducer.cardsById
                    .filter(
                      cardId =>
                        props.cardsReducer.cards[cardId].listId === listId,
                    )
                    .map((card, index) => (
                      <TrelloCard
                        cardId={card}
                        key={props.cardsReducer.cards[card].id}
                        title={props.cardsReducer.cards[card].title}
                        index={index}
                      />
                    ))} */}

                  <ActionButton index={index} listId={listId} />

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

const mapStateToProps = state => {
  console.log('map state', state);
  return {
    list: state.listsReducer.lists,
    listById: state.listsReducer.listById,
    // card: state.cardsReducer.cards,
    cardsReducer: state.cardsReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTitle: (listId, title) => {
      dispatch(updateListTitleRequest(listId, title));
    },
    fetchAllCards: () => {
      dispatch(fetchAllCardsRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrelloList);
