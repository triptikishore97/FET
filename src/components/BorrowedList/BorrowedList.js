import React from "react";
import BookCard from "../BookCard/BookCard";
import "./BorrowedList.css";

const BorrowedList = ({ books, onReturn }) => {
  return (
    <section className="borrowed">
      <h2>My Borrowed Books</h2>
      {books.length === 0 ? (
        <p className="empty">You have not borrowed any books.</p>
      ) : (
        books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onReturn={onReturn}
            isBorrowedView={true}
          />
        ))
      )}
    </section>
  );
};

export default BorrowedList;
