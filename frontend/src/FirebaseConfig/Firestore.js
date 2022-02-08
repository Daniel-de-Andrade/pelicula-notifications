import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

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

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
