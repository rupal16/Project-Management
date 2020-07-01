import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';

export const userDbRef = firebaseApp.database();

//create list
export const createList = async (title, projectId) => {
  console.log('create list service', title, projectId);
  let listRef = await firebase
    .database()
    .ref('Lists')
    .push({ title });

  let listId = listRef.key;

  let listArrRef = await firebase
    .database()
    .ref('Projects/' + projectId + '/listsOrder')
    .once('value');
  let listArr = listArrRef.val() || [];

  listArr.push(listId);
  console.log('listARray', listArr);

  await firebase
    .database()
    .ref('Projects/' + projectId + '/listsOrder')
    .set(listArr);

  return { title, projectId, listId };
};

//fetch all lists
export const fetchAllLists = async projectId => {
  let Promise = require('es6-promise').Promise;
  //fetch list ids from projects->listsOrder
  let listArrRef = await firebase
    .database()
    .ref('Projects/' + projectId + '/listsOrder')
    .once('value');
  let listArr = listArrRef.val() || [];

  console.log('listArr', listArr);

  //map listArr to Lists
  let listArrayPromises = listArr.map(listId => {
    let listRef = firebase
      .database()
      .ref('Lists/' + listId)
      .once('value');
    return listRef;
  });

  // eslint-disable-next-line no-undef
  let resolvedPromises = await Promise.all(listArrayPromises);
  resolvedPromises = resolvedPromises.map(response => {
    const val = response.val();
    console.log('val', response);
    return { ...val, id: response.key };
  });

  console.log('resolved promises', resolvedPromises);
  return { sortedListArray: resolvedPromises };
};

export const updateListTitle = (listId, title) => {
  console.log('from update list title service', listId, title);
  let listRef = firebase.database();
  return listRef.ref('Lists/' + listId + '/title').set(title);
};

//create card
export const createCard = (title, listId) => {
  let cardRef = firebase.database().ref('Cards');
  return cardRef.push({ title, listId });
};

export const fetchAllCards = async () => {
  let cardRef = firebase.database().ref('Cards');
  let cards = await cardRef.once('value');
  return cards.val();
};

// export const fetchAllProjects = async () => {
//   let projectRef = firebase.database().ref('Projects');
//   let projects = await projectRef.once('value');

//   return projects.val();
// };
