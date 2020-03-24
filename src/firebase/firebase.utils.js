import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
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
      });
    } catch (error) {
      console.log("error creating user ", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionName,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionName);

  ///> Do a batch write to avoid unpredictable write operation in case of connection failure or other reasons.
  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc(); // Create a new firebase document to get an automatic id
    batch.set(newDocRef, obj);
  });

  // fire batch call
  return await batch.commit();
};

///> Function to get the snapshot then convert it to an object
export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      id: doc.id,
      routeName: encodeURI(title.toLowerCase()), // Converts a string into a URI that can be read with browsers
      title,
      items
    };
  });

  return transformedCollection.reduce((accum, collection) => {
    accum[collection.title.toLowerCase()] = collection;
    return accum;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
