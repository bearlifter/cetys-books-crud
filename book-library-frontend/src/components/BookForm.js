import React, { useState, useEffect } from "react";

const BookForm = ({ addBook, updateBook, selectedBook }) => {
  const [bookData, setBookData] = useState({ title: "", author: "" });
  const [isHarryPotter, setIsHarryPotter] = useState(false);

  useEffect(() => {
    if (selectedBook) {
      setBookData(selectedBook);
    }
  }, [selectedBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));

    // Check if "Harry Potter" is entered
    if (name === "title" && value.toLowerCase() === "harry potter") {
      setIsHarryPotter(true);
    } else {
      setIsHarryPotter(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBook) {
      updateBook(bookData);
    } else {
      addBook(bookData);
    }
    setBookData({ title: "", author: "" });
    setIsHarryPotter(false); // Reset the background
  };

  return (
    <div className={`book-form-container ${isHarryPotter ? "harry-potter-bg" : ""}`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={bookData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={bookData.author}
          onChange={handleChange}
          required
        />
        <button type="submit">{selectedBook ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default BookForm;
