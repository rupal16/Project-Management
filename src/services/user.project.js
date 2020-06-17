import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';

export const userDbRef = firebaseApp.database();

// create project
// export const createProject = async (projectTitle, projectDescription) => {
//   let projectRef = firebase.database().ref('Projects');

//   projectRef
//     .push()
//     .child('title')
//     .set({ projectTitle, projectDescription });
// };
export const createProject = async (projectTitle, projectDescription) => {
  let projectRef = firebase.database().ref('Projects');

  projectRef
    .push()
    // .child('title')
    .set({ projectTitle, projectDescription });
  // projectRef
  //   .push()
  //   .child('description')
  //   .set({ projectDescription });
};

// fetch all projects
export const fetchAllProjects = async () => {
  let projectRef = firebase.database().ref('Projects');
  let projects = await projectRef.once('value');
  // .orderByChild('title')

  return projects.val();
};

//fetch project by id
export const fetchProjectById = async id => {
  let projectRef = firebase.database().ref('Projects');
  let snapshot = await projectRef.once('value');

  let project = snapshot.val()[id];

  return project;
};

//delete project by id

export const removeProject = async id => {
  firebase
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
    // .child('title')
    .set({ projectTitle, projectDescription });
};
