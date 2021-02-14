import firebase from "firebase";

let firebaseConfig = {
  apiKey: "AIzaSyDhuTQ-hqA9WJ7Y9uZYlxcDX4FNw6iJ-iI",
  authDomain: "subirapoyo.firebaseapp.com",
  projectId: "subirapoyo",
  storageBucket: "subirapoyo.appspot.com",
  messagingSenderId: "397185375554",
  appId: "1:397185375554:web:28663278d64d5ee635bcdb",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
export const storage = firebaseApp.storage();

export const photosRef = storage.ref('photos')
