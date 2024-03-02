const express = require('express');
const cors = require('cors'); 
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 8000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies for this app.
app.use(express.json());

// books data
const booksData ={
  "books": [
    {
      "name": "Slow Horses (Deluxe Edition)",
      "author": "Mick Herron",
      "thumbnail": "https://m.media-amazon.com/images/I/51Ga5GuElyL._SX331_BO1,204,203,200_.jpg",
      "price": 14,
      "rating": 3,
      "featured": false,
      "id": uuidv4()
    },
    {
      "name": "The Last Thing He Told ME",
      "author": "Laura Dave",
      "thumbnail": "https://m.media-amazon.com/images/P/1501171348.01._SCLZZZZZZZ_SX500_.jpg",
      "price": "1200",
      "rating": "4",
      "featured": false,
      "id": uuidv4()
    },
    {
      "name": "JavaScript: The Definitive Guide",
      "author": "Marijn Havarbeke",
      "thumbnail": "https://m.media-amazon.com/images/I/91hUer84PpL._AC_UY327_FMwebp_QL65_.jpg",
      "price": "200",
      "rating": "5",
      "featured": false,
      "id": uuidv4()
    },
    {
      "name": "JavaScript from Beginner to Professional",
      "author": " Laurence Lars Svekis",
      "thumbnail": "https://m.media-amazon.com/images/I/71oZ45OrLjL._SY425_.jpg",
      "price": "350",
      "rating": "4",
      "featured": true,
      "id": uuidv4()
    },
    {
      "name": "JavaScript All-in-One For Dummies",
      "author": "Chris Minnick ",
      "thumbnail": "https://m.media-amazon.com/images/I/81ycHtBjMWL._AC_UY327_FMwebp_QL65_.jpg",
      "price": "300",
      "rating": "5",
      "featured": true,
      "id": uuidv4()
    }
  ]
}

// Route to get all books
app.get('/books', (req, res) => {
  try {
    res.json(booksData.books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific book by ID
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const book = booksData.books.find((b) => b.id === bookId);

  if (!book) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }

  res.json(book);
});
// Route to create a new book
app.post('/books', (req, res) => {
  try {
    const newBook = req.body; // Assuming the request body contains the new book details
    newBook.id = uuidv4(); // Generate a new UUID for the book
    booksData.books.push(newBook);
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to partially update a book by ID using PATCH
app.patch('/books/:id', (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedFields = req.body; // Assuming the request body contains the fields to be updated

    // Find the index of the book with the specified ID
    const index = booksData.books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
      // Partially update the book if found
      booksData.books[index] = { ...booksData.books[index], ...updatedFields };
      res.json(booksData.books[index]);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Route to delete a book by ID
app.delete('/books/:id', (req, res) => {
  try {
    const bookId = req.params.id;

    // Filter out the book with the specified ID
    booksData.books = booksData.books.filter((book) => book.id !== bookId);

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});





