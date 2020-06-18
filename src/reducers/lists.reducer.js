let listId = 2;
let cardId = 4;

const initialState = [
  {
    title: 'last episode',
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
    title: 'first episode',
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
    case 'ADD_LIST':
      const newList = {
        title: action.payload.title,
        cards: [],
        id: `list-${listId}`,
      };
      console.log('listid form reducer', listId);
      listId += 1;
      return [...state, newList];

    case 'ADD_CARD': {
      const newCard = {
        text: action.payload.text,
        id: `card-${cardId}`,
      };
      cardId += 1;
      console.log('add card action');
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
      } = action.payload;
      const newState = [...state];
      //in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find(list => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }
      return newState;

    default:
      return state;
  }
};

export { listsReducer };
