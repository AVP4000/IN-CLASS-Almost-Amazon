import { getSingleBook, deleteBook } from './bookData';
import { getSingleAuthor, deleteSingleAuthor, getAuthorBooks } from './authorData';

// for merged promises
// TODO: Get BOOK data for viewBook
const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
// GET SINGLE BOOK
  getSingleBook(firebaseKey).then((bookObject) => { // returns single book object
    getSingleAuthor(bookObject.author_id) // we nest this promise so that we can use the book object
      .then((authorObject) => resolve({ ...bookObject, authorObject }));
  }).catch(reject);
});

// GET AUTHOR for viewAuthor Details
// Create an object that has book data and an object named authorObject
const getAuthorDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(firebaseKey).then((authorObject) => { // returns single book object
    getAuthorBooks(firebaseKey) // we nest this promise so that we can use the author object
      .then((authorBooksArray) => resolve({ ...authorObject, books: authorBooksArray }));
  }).catch(reject);
});

// In order to get all of the books, we will need to create an array of promises
// We will pass this array to Promise.all(). (Docs)
// Once all the books have been deleted, THEN we will delete the author
const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export {
  getBookDetails,
  getAuthorDetails,
  deleteAuthorBooksRelationship
};
