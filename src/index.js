import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc,
deleteDoc,doc, } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvAy7nj6jiWQV1_H5JOeEJC_O4WJ7fjnA",
  authDomain: "fir-9-b84b8.firebaseapp.com",
  projectId: "fir-9-b84b8",
  storageBucket: "fir-9-b84b8.appspot.com",
  messagingSenderId: "601970819058",
  appId: "1:601970819058:web:8982aaba026ef2d6c1756b",
};

//init firebase app
initializeApp(firebaseConfig);

//init services
const db = getFirestore();

//collection ref
const colRef = collection(db, "books");

//real time collection data
  onSnapshot(colRef,(snapshot)=>{
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })

//adding documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    addBookForm.reset();
  });
});

//deleting documents
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db,'books',deleteBookForm.id.value)

  deleteDoc(docRef)
  .then(()=>{
    deleteBookForm.reset();
  });

});
