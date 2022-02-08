import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDYKB9RYcCOKBT3MglnSniIOfpaWXcMdcw",
  authDomain: "pelicula-notification.firebaseapp.com",
  databaseURL: "https://pelicula-notification-default-rtdb.firebaseio.com",
  projectId: "pelicula-notification",
  storageBucket: "pelicula-notification.appspot.com",
  messagingSenderId: "247783353548",
  appId: "1:247783353548:web:fe987bd411cab926786669",
  measurementId: "G-Y1DMNM8PPL",
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
