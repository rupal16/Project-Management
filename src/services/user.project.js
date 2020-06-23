import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';

export const userDbRef = firebaseApp.database();

// export const saveUser = (firstName, lastName, phone, email) => {
//   let userId = firebase.auth().currentUser.uid;

//   return firebase
//     .database()
//     .ref('users/' + userId)
//     .set({
//       firstName,
//       lastName,
//       phone,
//       email,
//     });
// };

// export const createProject = args => {
//   console.log('from service', args);
//   console.log('inside create project service');
//   let projectRef = firebase.database().ref('Projects');

//   return projectRef.push().set({
//     projectTitle: args[0],
//     projectDescription: args[1],
//   });
// };

// fetch all projects
export const fetchAllProjects = async () => {
  let projectRef = firebase.database().ref('Projects');
  let projects = await projectRef.once('value');

  return projects.val();
};

export const createProject = (projectTitle, projectDescription) => {
  console.log('inside create project service');
  let projectRef = firebase.database().ref('Projects');
  let dbRef = projectRef.push();

  dbRef.set({ projectTitle, projectDescription });
  return fetchAllProjects();
  // return dbRef.once('value').then(snapshot => {
  //   return snapshot.val();
  // });
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
