import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAOQSRVX9Kr0877wObNVYKZVFFTtJe_p1U",
  authDomain: "ecommercereact-29cd9.firebaseapp.com",
  databaseURL: "https://ecommercereact-29cd9.firebaseio.com",
  projectId: "ecommercereact-29cd9",
  storageBucket: "",
  messagingSenderId: "228924943971",
  appId: "1:228924943971:web:3231fd9fd74cf746749256",
  measurementId: "G-3MWRVJPV4W"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {

  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user ', error.message);
    }
  }

  return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;