import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';

export const userDbRef = firebaseApp.database();

export const createProject = async (projectTitle, projectDescription) => {
  let userId = firebase.auth().currentUser.uid;
  console.log('userid inside user project service', userId);
  console.log('project details', projectTitle, projectDescription);
  return firebase
    .database()
    .ref('projects/' + userId)
    .set({
      projectTitle,
      projectDescription,
    });
};

export const fetchProject = async () => {
  let userId = firebase.auth().currentUser.uid;

  const snapshot = await userDbRef.ref('/projects/' + userId).once('value');
  let projectTitle = snapshot.val().projectTitle;
  let projectDescription = snapshot.val().projectDescription;
  return { projectTitle, projectDescription };
};
