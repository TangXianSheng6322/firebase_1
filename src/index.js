import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATrzh_8PCXTmaaXPnmUeXLl_t54LyHGBs",
  authDomain: "something-for-tutorial.firebaseapp.com",
  projectId: "something-for-tutorial",
  storageBucket: "something-for-tutorial.firebasestorage.app",
  messagingSenderId: "310312487260",
  appId: "1:310312487260:web:0eea14694ce54357d39999",
  measurementId: "G-8TRVDT6KGV",
};

//init firebase app
initializeApp(firebaseConfig);

//init services
const db = getFirestore();

//collection reference
const colRef = collection(db, "books");

//get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });
