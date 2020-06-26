import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

import TrelloCard from '../TrelloCard';
import ActionButton from '../actionButton';
import { updateListTitleRequest } from '../../actions';

import './style.scss';

// const TrelloList = ({ title, cards, listId, index, updateTitle }) => {
const TrelloList = props => {
  const { title, cards, listId, index, updateTitle } = props;
  const [isUpdate, setUpdate] = useState(false);
  const [newTitle, setTitle] = useState({ title });

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
    updateTitle(listId, newTitle);
  };
  // console.log('listid', listId);
  // console.log('props title', this.props);
  console.log('listss', props.list);
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
                      onChange={onChangeHandler}
                    />
                  ) : (
                    <div onClick={clickHandler}>{props.title}</div>
                  )}

                  {Array.isArray(cards) &&
                    cards.length !== 0 &&
                    cards.map((card, index) => (
                      <TrelloCard
                        listTitle={title}
                        key={card.id}
                        index={index}
                        text={card.text}
                        id={card.id}
                      />
                    ))}

                  <ActionButton index={index} />

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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTitle: (listId, title) => {
      dispatch(updateListTitleRequest(listId, title));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrelloList);
