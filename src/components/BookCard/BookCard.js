import React from "react";
import "./BookCard.css";

const BookCard = ({ book, onBorrow, onReturn, isBorrowedView = false }) => {
  return (
    <div className="book-card">
      <div className="book-info">
        <h4>{book.title}</h4>
        <p>by {book.author}</p>
        {!isBorrowedView && <small>{book.copies} copies</small>}
      </div>

      {isBorrowedView ? (
        <button className="return-btn" onClick={() => onReturn(book)}>
          Return
        </button>
      ) : (
        <button onClick={() => onBorrow(book)}>Borrow</button>
      )}
    </div>
  );
};

export default BookCard;
