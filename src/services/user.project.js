import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';

export const userDbRef = firebaseApp.database();

// create project
export const createProject = async (projectTitle, projectDescription) => {
  let projectRef = firebase.database().ref('Projects');
  console.log('userid inside user project service');
  console.log('project details', projectTitle);
  projectRef
    .push()
    .child('title')
    .set({ projectTitle, projectDescription });
};

// fetch all projects
export const fetchAllProjects = async cb => {
  console.log('inside fetch all service');
  let projectRef = firebase.database().ref('Projects');
  let projects = await projectRef.orderByChild('title').once('value');

  return projects.val();
};

//fetch project by id
export const fetchProjectById = async id => {
  let projectRef = firebase.database().ref('Projects');
  projectRef
    .orderByChild('title')
    .once('value')
    .then(snapshot => {
      snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.key === id) {
          console.log('selected one', childSnapshot.val());
        }
      });
    });
};

//delete project by id

export const removeProject = async id => {
  firebase
    .database()
    .ref('Projects')
    .child(id)
    .remove();
  console.log('deleted', id);
};

//update project details

export const updateProject = async (id, { title, description }) => {
  firebase
    .database()
    .ref('Projects')
    .child(id)
    .child('title')
    .set({ title, description });
};
