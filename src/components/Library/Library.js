import React from "react";
import BookCard from "../BookCard/BookCard";
import "./Library.css";

const Library = ({ books, onBorrow }) => {
  return (
    <section className="library">
      <h2>Available Books</h2>
      {books.length === 0 ? (
        <p className="empty">No books available in the library.</p>
      ) : (
        books.map((book) => (
          <BookCard key={book.id} book={book} onBorrow={onBorrow} />
        ))
      )}
    </section>
  );
};

export default Library;
