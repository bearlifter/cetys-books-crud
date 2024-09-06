import React, { useState, useEffect } from "react";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await fetch("/api/books");
    const data = await response.json();
    setBooks(data);
  };

  const addBook = async (book) => {
    const response = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    const newBook = await response.json();
    setBooks([...books, newBook]);
  };

  const updateBook = async (book) => {
    const response = await fetch(`/api/books/${book.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    const updatedBook = await response.json();
    setBooks(books.map((b) => (b.id === updatedBook.id ? updatedBook : b)));
    setSelectedBook(null); // Reset the selected book after updating
  };

  const deleteBook = async (id) => {
    await fetch(`/api/books/${id}`, { method: "DELETE" });
    setBooks(books.filter((book) => book.id !== id));
  };

  const selectBook = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className="App">
      <h1>Book Library</h1>
      <BookForm addBook={addBook} updateBook={updateBook} selectedBook={selectedBook} />
      <BookList books={books} deleteBook={deleteBook} selectBook={selectBook} />
    </div>
  );
}

export default App;
