let listId = 2;
let cardId = 0;

const initialState = [
  // {
  //   title: 'last episode',
  //   id: 0,
  //   cards: [
  //     {
  //       id: 0,
  //       text: 'task 1',
  //     },
  //     {
  //       id: 1,
  //       text: 'task 2',
  //     },
  //   ],
  // },
];

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_LIST':
      const newList = {
        title: action.payload.title,
        cards: [],
        id: listId,
      };
      console.log('listid form reducer', listId);
      listId += 1;
      return [...state, newList];

    case 'ADD_CARD':
      const newCard = {
        text: action.payload.text,
        id: cardId,
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

    default:
      return state;
  }
};

export { listsReducer };
