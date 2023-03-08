import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc,
deleteDoc,doc, query, where, orderBy, serverTimestamp,getDoc, updateDoc } from "firebase/firestore";

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

//queries
const q = query(colRef, orderBy('createdAt'));

//real time collection data
  onSnapshot(q,(snapshot)=>{
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
    createdAt: serverTimestamp(),
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

//get a single document

const docRef =  doc(db, 'books', '4g7NKYB3evjG2Xm3XzZH')
onSnapshot(docRef, (doc)=>{
    console.log(doc.data(), doc.id)
})


//update a document
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const docRef = doc(db, 'books', updateForm.id.value);

    updateDoc(docRef,{
        title: 'updated title',
    })
    .then(()=>{
        updateDoc.reset();
    })
})