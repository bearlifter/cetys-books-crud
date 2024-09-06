const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const BookDto = require("../dto/bookDto");
const BookViewModel = require("../viewModels/bookViewModel");

// Create
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(BookDto.fromModel(book));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read (all)
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    const bookDtos = books.map((book) => BookDto.fromModel(book));
    res.json(bookDtos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read (one)
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(BookViewModel.fromModel(book));
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async(req,res)=> {
  try {
    
    
  } catch (error) {
    
  }
})

// Update
router.put("/:id", async (req, res) => {
  try {
    const updatedData = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id, updatedData, {
      new: true, // This returns the updated book
      runValidators: true, // Ensures that validation rules are respected
    });

    if (book) {
      res.json(BookViewModel.fromModel(book));
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (book) {
      res.json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

