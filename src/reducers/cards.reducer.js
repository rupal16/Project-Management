const cardsReducer = (
  state = {
    isLoading: false,
    error: '',
    cards: {},
    cardsById: [],
  },
  action,
) => {
  switch (action.type) {
    case 'ADD_CARD_SUCCESS':
      console.log('add card reducer', action.payload.text);

      return {
        ...state,
        cards: {
          ...state.cards,
          [action.payload.cardId]: {
            listId: action.payload.listId,
            title: action.payload.text,
          },
        },
        cardsById: [...state.cardsById, action.payload.cardId],
      };

    case 'ADD_CARD_REQUEST': {
      return { ...state };
    }

    case 'ADD_CARD_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'FETCH_ALL_CARDS_REQUEST':
      return { ...state };

    case 'FETCH_ALL_CARDS_SUCCESS':
      return {
        ...state,
        isloading: false,
        cards: action.payload.cards,
        cardsById: Object.keys(action.payload.cards),
      };

    case 'FETCH_ALL_CARDS_FAILURE':
      return { ...state, error: action.payload.error };

    default:
      return state;
  }
};

export { cardsReducer };
