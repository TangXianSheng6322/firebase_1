import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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
const auth = getAuth();

//collection reference
const colRef = collection(db, "books");

//collection query
const q = query(
  colRef,
  // where("author", "==", "Harper Lee"),
  orderBy("createdAt")
  // orderBy("title", "desc")
);

// //get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(books);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

//realtime collection data
onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

//adding document
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

//IDK I spent 30 min looking for what was wrong, and after i changed the code to the one from tutorial it started to work even though the code is IDENTICAL and now all of the sudden my code also starts to work like whaaaaaat, I need to stop looking for troubles and refresh the s out of the code, like.....
//this is the code from github
//
//  const addBookForm = document.querySelector('.add')
// addBookForm.addEventListener('submit', (e) => {
//   e.preventDefault()

//   addDoc(colRef, {
//     title: addBookForm.title.value,
//     author: addBookForm.author.value,
//   })
//   .then(() => {
//     addBookForm.reset()
//   })
// })

//like its the same, so idk why it didnt work for me for 30 min

//deleting document
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

//get a single document
const docRef = doc(db, "books", "x0f7Mc5PfvdcQjsUxprn");

getDoc(docRef).then((doc) => {
  console.log(doc.data(), doc.id);
});

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

//update a document
const updateBookForm = document.querySelector(".update");
updateBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", updateBookForm.id.value);

  updateDoc(docRef, { title: "updated title" }).then(() => {
    updateBookForm.reset();
  });
});

//signing users up
const singupForm = document.querySelector(".signup");
singupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = singupForm.email.value;
  const password = singupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("User created:", cred.user);
      singupForm.reset();
    })
    .catch((err) => {
      console.log("Error creating user:", err.message);
    });
});

// login in and out
const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("The user logged in", cred.user);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", () => {
  signOut(auth).then(() => {
    console.log("The user signed out").catch((err) => {
      console.log(err.message);
    });
  });
});
