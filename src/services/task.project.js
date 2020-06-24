import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';

export const userDbRef = firebaseApp.database();

//create list
export const createList = async title => {
  let listRef = firebase.database().ref('Lists');
  listRef.set({ title });
};

//create card
export const createCard = async (cardId, title) => {
  let listRef = firebase.database().ref('Cards');
  listRef.set({ cardId, title });
};
