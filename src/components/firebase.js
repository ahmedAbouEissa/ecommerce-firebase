import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvoK9t8Ekto2LuEi5q4rkBGDF4xtBWulU",
  authDomain: "store-2d634.firebaseapp.com",
  projectId: "store-2d634",
  storageBucket: "store-2d634.appspot.com",
  messagingSenderId: "41028531880",
  appId: "1:41028531880:web:d0af41b8af84cea06d349d",
  measurementId: "G-L9SD1NN6KT",
};

const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
