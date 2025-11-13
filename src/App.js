import React, { useState } from "react";
import Library from "./components/Library/Library";
import BorrowedList from "./components/BorrowedList/BorrowedList";
import booksData from "./data/books";
import { MAX_BORROW_LIMIT } from "./utils/constants";
import "./App.css";

function App() {
  const [libraryBooks, setLibraryBooks] = useState(booksData);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const borrowBook = (book) => {
    if (borrowedBooks.length >= MAX_BORROW_LIMIT) {
      alert("Borrowing limit reached!");
      return;
    }

    if (borrowedBooks.some((b) => b.id === book.id)) {
      alert("You already borrowed this book.");
      return;
    }

    const updatedLibrary = libraryBooks
      .map((b) => (b.id === book.id ? { ...b, copies: b.copies - 1 } : b))
      .filter((b) => b.copies > 0);

    setLibraryBooks(updatedLibrary);
    setBorrowedBooks([...borrowedBooks, { ...book, copies: 1 }]);
  };

  const returnBook = (book) => {
    const exists = libraryBooks.find((b) => b.id === book.id);
    let updatedLibrary;

    if (exists) {
      updatedLibrary = libraryBooks.map((b) =>
        b.id === book.id ? { ...b, copies: b.copies + 1 } : b
      );
    } else {
      updatedLibrary = [...libraryBooks, { ...book, copies: 1 }];
    }

    const updatedBorrowed = borrowedBooks.filter((b) => b.id !== book.id);
    setLibraryBooks(updatedLibrary);
    setBorrowedBooks(updatedBorrowed);
  };

  return (
    <div className="app">
      <h1> Library Management</h1>
      <Library books={libraryBooks} onBorrow={borrowBook} />
      <BorrowedList books={borrowedBooks} onReturn={returnBook} />
    </div>
  );
}

export default App;
