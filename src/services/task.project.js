import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';

export const userDbRef = firebaseApp.database();

//create list
export const createList = (title, projectId) => {
  let listRef = firebase.database().ref('Lists');

  return listRef.push({ title, projectId });
};

export const fetchAllLists = async () => {
  let listRef = firebase.database().ref('Lists');
  let lists = await listRef.once('value');
  return lists.val();
};

export const updateListTitle = (listId, title) => {
  console.log('from update list title service', listId, title);
  let listRef = firebase.database();
  return listRef.ref('Lists/' + listId + '/title').set(title);
};

//create card
export const createCard = async (cardId, title) => {
  let listRef = firebase.database().ref('Cards');
  listRef.set({ cardId, title });
};
// export const fetchAllProjects = async () => {
//   let projectRef = firebase.database().ref('Projects');
//   let projects = await projectRef.once('value');

//   return projects.val();
// };
