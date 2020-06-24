import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';

export const userDbRef = firebaseApp.database();

// fetch all projects
export const fetchAllProjects = async () => {
  let projectRef = firebase.database().ref('Projects');
  let projects = await projectRef.once('value');

  return projects.val();
};

export const createProject = (projectTitle, projectDescription) => {
  let projectRef = firebase.database().ref('Projects');
  let dbRef = projectRef.push();

  dbRef.set({ projectTitle, projectDescription });
  return fetchAllProjects();
};

//fetch project by id
export const fetchProjectById = async id => {
  let projectRef = firebase.database().ref('Projects');
  let snapshot = await projectRef.once('value');

  let project = snapshot.val()[id];

  return project;
};

//delete project by id
//return promises
export const removeProject = async id => {
  return firebase
    .database()
    .ref('Projects')
    .child(id)
    .remove();
};

//update project details

export const updateProject = async (id, projectTitle, projectDescription) => {
  firebase
    .database()
    .ref('Projects')
    .child(id)
    .set({ projectTitle, projectDescription });
};
