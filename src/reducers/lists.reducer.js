let listId = 2;
let cardId = 4;

const initialState = [
  {
    title: 'todo',
    id: `list-${0}`,
    cards: [
      {
        id: `card-${0}`,
        text: 'task 1',
      },
      {
        id: `card-${1}`,
        text: 'task 2',
      },
    ],
  },
  {
    title: 'done',
    id: `list-${1}`,
    cards: [
      {
        id: `card-${2}`,
        text: 'task 1',
      },
      {
        id: `card-${3}`,
        text: 'task 2',
      },
    ],
  },
];

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_LIST_REQUEST':

    case 'ADD_LIST_SUCCESS':
      const newList = {
        title: action.payload.title,
        cards: [],
        id: `list-${listId}`,
      };

      listId += 1;
      return [...state, newList];

    case 'ADD_CARD_REQUEST':
      break;

    case 'ADD_CARD_SUCCESS': {
      const newCard = {
        text: action.payload.text,
        id: `card-${cardId}`,
      };
      cardId += 1;

      const newState = state.map(list => {
        if (list.id === action.payload.listId) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        } else {
          return list;
        }
      });
      return newState;
    }

    case 'DRAG_HAPPENED':
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        type,
      } = action.payload;
      const newState = [...state];

      //dragging lists around
      if (type === 'list') {
        const list = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...list);
        return newState;
      }

      //in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find(list => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }
      //in other list
      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state.find(list => droppableIdStart === list.id);
        //pull out the card from the list
        const card = listStart.cards.splice(droppableIndexStart, 1);
        //list where drag ended
        const listEnd = state.find(list => droppableIdEnd === list.id);
        //put card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }
      return newState;

    default:
      return state;
  }
};

export { listsReducer };
