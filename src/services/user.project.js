import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';

export const userDbRef = firebaseApp.database();

// create project
// export const createProject = async (projectTitle, projectDescription) => {
//   let projectRef = firebase.database().ref('Projects');
//   console.log('userid inside user project service');
//   console.log('project details', projectTitle);
//   projectRef
//     .push()
//     .child('title')
//     .set({ projectTitle, projectDescription });
// };
export const createProject = async (projectTitle, projectDescription) => {
  let projectRef = firebase.database().ref('Projects');
  console.log('userid inside user project service');
  console.log('project details', projectTitle);
  projectRef
    .push()
    .child('title')
    .set({ projectTitle, projectDescription });
  // projectRef
  //   .push()
  //   .child('description')
  //   .set({ projectDescription });
};

// fetch all projects
export const fetchAllProjects = async () => {
  console.log('inside fetch all service');
  let projectRef = firebase.database().ref('Projects');
  let projects = await projectRef.orderByChild('title').once('value');

  return projects.val();
};

//fetch project by id
export const fetchProjectById = async id => {
  console.log('fetch service');
  let projectRef = firebase.database().ref('Projects');
  let snapshot = await projectRef.orderByChild('title').once('value');
  console.log('snapshot', snapshot.val());
  let project = snapshot.val()[id];
  console.log('projectttt', project);
  return project;
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

export const updateProject = async (id, projectTitle, projectDescription) => {
  console.log('inside update service');
  firebase
    .database()
    .ref('Projects')
    .child(id)
    .child('title')
    .set({ projectTitle, projectDescription });
};
