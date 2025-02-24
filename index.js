require("dotenv").config();
const express = require("express");
const Book = require("./models/book.models");
const { initializeDatabase } = require("./db/db.connect");
const cors = require('cors')
const app = express();

const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin:"*",
    credentials:true
}

app.use(cors(corsOptions));
app.use(express.json());

initializeDatabase();
app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
});

// Create book
const createBook = async (bookData) => {
    try {
        const newBook = new Book(bookData);
        const savedBook = await newBook.save();
        return savedBook;
    } catch (error) {
        throw error;
    }
};
app.post("/books", async (req, res) => {
    try {
        const newBook = await createBook(req.body);
        console.log(newBook);
        if (newBook) {
            res.status(201).json({
                message: "Book added successfully.",
                data: newBook,
            });
        } else {
            res.status(400).json({ error: "Failed to add book." });
        }
    } catch (error) {
        res.status(500).json({
            error: "Failed to add book.",
            errorDetails: error,
        });
    }
});

// Get all book
const getAllBooks = async () => {
    try {
        const books = await Book.find();
        return books;
    } catch (error) {
        throw error;
    }
};
app.get("/books", async (req, res) => {
    try {
        const books = await getAllBooks();
        if (books.length > 0) {
            res.status(200).json({
                messaage: "Books fetched successfully.",
                data: books,
            });
        } else {
            res.status(404).json({ error: "No books found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch book." });
    }
});

// Get book by id
const getBookId = async (id) => {
    try {
        const books = await Book.findById(id);
        return books;
    } catch (error) {
        throw error;
    }
};
app.get("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const books = await getBookId(id);
        if (books) {
            res.status(200).json({
                messaage: "Books fetched successfully.",
                data: books,
            });
        } else {
            res.status(404).json({ error: "No books found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch book." });
    }
});

// Get book by title
const getBookByTitle = async (title) => {
    try {
        const books = await Book.find({ title });
        return books;
    } catch (error) {
        throw error;
    }
};
app.get("/books/title/:title", async (req, res) => {
    try {
        const { title } = req.params;
        const books = await getBookByTitle(title);
        if (books.length > 0) {
            res.status(200).json({
                messaage: "Book fetched successfully.",
                data: books,
            });
        } else {
            res.status(404).json({ error: "No book found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch book." });
    }
});

// Get book by author
const getBookByAuthor = async (author) => {
    try {
        const books = await Book.find({ author });
        return books;
    } catch (error) {
        throw error;
    }
};
app.get("/books/author/:author", async (req, res) => {
    try {
        const { author } = req.params;
        const books = await getBookByAuthor(author);
        if (books.length > 0) {
            res.status(200).json({
                messaage: "Books fetched successfully.",
                data: books,
            });
        } else {
            res.status(404).json({ error: "No book found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch book." });
    }
});

// Get book by genre
const getBookByGenre = async (genre) => {
    try {
        const books = await Book.find({ genre });
        return books;
    } catch (error) {
        throw error;
    }
};
app.get("/books/genre/:genre", async (req, res) => {
    try {
        const { genre } = req.params;
        const books = await getBookByGenre(genre);
        if (books.length > 0) {
            res.status(200).json({
                messaage: "Books fetched successfully.",
                data: books,
            });
        } else {
            res.status(404).json({ error: "No book found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch book." });
    }
});

// Get book by publishedYear
const getBookByPublishedYear = async (publishedYear) => {
    try {
        const books = await Book.find({ publishedYear });
        return books;
    } catch (error) {
        throw error;
    }
};
app.get("/books/year/:publishedYear", async (req, res) => {
    try {
        const { publishedYear } = req.params;
        const books = await getBookByPublishedYear(publishedYear);
        if (books.length > 0) {
            res.status(200).json({
                messaage: "Books fetched successfully.",
                data: books,
            });
        } else {
            res.status(404).json({ error: "No book found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch book." });
    }
});

// Update book by ID
const updateBookById = async (id, bookData) => {
    try {
        const books = await Book.findByIdAndUpdate(id, bookData, { new: true });
        return books;
    } catch (error) {
        throw error;
    }
};
app.post("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const books = await updateBookById(id, req.body);
        if (books) {
            res.status(200).json({
                messaage: "Books updated successfully.",
                data: books,
            });
        } else {
            res.status(404).json({ error: "No book found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update book." });
    }
});

// Update book by title
const updateBookByTitle = async (title, bookData) => {
    try {
        const books = await Book.findOneAndUpdate({ title }, bookData, {
            new: true,
        });
        return books;
    } catch (error) {
        throw error;
    }
};
app.post("/books/title/:title", async (req, res) => {
    try {
        const { title } = req.params;
        const books = await updateBookByTitle(title, req.body);
        if (books) {
            res.status(200).json({
                messaage: "Books updated successfully.",
                data: books,
            });
        } else {
            res.status(404).json({ error: "No book found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update book." });
    }
});

// Delete book by id
const deleteBookById = async (id) => {
    try {
        const books = await Book.findByIdAndDelete(id);
        return books;
    } catch (error) {
        throw error;
    }
};
app.delete("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const books = await deleteBookById(id);
        if (books) {
            res.status(200).json({
                messaage: "Book deleted successfully.",
                data: books,
            });
        } else {
            res.status(404).json({ error: "No book found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete book." });
    }
});
