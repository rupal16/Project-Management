const listsReducer = (
  state = {
    isLoading: false,
    error: '',
    lists: {},
  },
  action,
) => {
  switch (action.type) {
    case 'ADD_LIST_SUCCESS':
      console.log('add list reducer', action.payload.title);

      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.listId]: {
            projectId: action.payload.projectId,
            title: action.payload.title,
          },
        },
      };

    case 'ADD_LIST_REQUEST': {
      // const newList = {
      //   title: action.payload.title,
      //   projectId: action.payload.projectId,
      //   cards: [],
      //   // listId: `list-${listId}`,
      //   // listId: action.payload.listId,
      // };

      // listId += 1;
      return { ...state };
    }

    case 'UPDATE_LIST_TITLE_REQUEST':
      return { ...state };
    // return {
    //   ...state,
    //   lists: [
    //     ...state.lists,
    //     ([action.payload.listId] = action.payload.title),
    //   ],
    // };

    case 'UPDATE_LIST_TITLE_SUCCESS':
      console.log(
        'success reducer',
        action.payload.listId,
        action.payload.title,
      );
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.listId]: {
            ...state.lists[action.payload.listId],
            title: action.payload.title,
          },
        },
      };
    // state.lists.map(list => {
    //   console.log('list', list);
    // if (list.id === action.payload.id) {
    //   list.title = action.payload.title;
    // }
    // });

    // return { ...state };

    // console.log('list state', state.lists.action.payload.listId);
    // return {
    //   ...state,
    //   lists: {
    //     ...state.lists,
    //     {
    //       state.map(list => )
    //     }
    //     // [action.payload.listId]: action.payload.title,
    //   },
    // };

    case 'UPDATE_LIST_TITLE_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'ADD_CARD_REQUEST':
      break;

    case 'ADD_CARD_SUCCESS': {
      const newCard = {
        text: action.payload.text,
        // id: `card-${cardId}`,
      };
      // cardId += 1;

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
    case 'FETCH_ALL_LISTS_REQUEST':
      return Object.assign({}, state, {
        isLoading: true,
      });

    case 'FETCH_ALL_LISTS_SUCCESS':
      return Object.assign({}, state, {
        isLoading: false,
        lists: action.payload.lists,
      });

    case 'FETCH_ALL_LISTS_FAILURE':
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error,
      });

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

// case 'FETCH_ALL_PROJECTS_FAILURE':
//       return Object.assign({}, state, {
//         isLoading: false,
//         error: action.error,
//       });
//     case 'FETCH_ALL_PROJECTS_REQUEST':
//       return Object.assign({}, state, {
//         isLoading: true,
//       });

//     case 'FETCH_ALL_PROJECTS_SUCCESS':
//       return Object.assign({}, state, {
//         isLoading: false,
//         projects: action.payload.projects,
//       });
