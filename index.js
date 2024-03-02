const express = require('express');
const cors = require('cors'); // To handle CORS issues

const app = express();
const port = 9000;

// Enable CORS for all routes
app.use(cors());

// Your questions data
const booksData ={
  "books": [
    {
      "name": "Slow Horses (Deluxe Edition)",
      "author": "Mick Herron",
      "thumbnail": "https://m.media-amazon.com/images/I/51Ga5GuElyL._SX331_BO1,204,203,200_.jpg",
      "price": 14,
      "rating": 3,
      "featured": false,
      "id": 1
    },
    {
      "name": "The Last Thing He Told ME",
      "author": "Laura Dave",
      "thumbnail": "https://m.media-amazon.com/images/P/1501171348.01._SCLZZZZZZZ_SX500_.jpg",
      "price": "1200",
      "rating": "4",
      "featured": false,
      "id": 2
    },
    {
      "name": "JavaScript: The Definitive Guide",
      "author": "Marijn Havarbeke",
      "thumbnail": "https://m.media-amazon.com/images/I/91hUer84PpL._AC_UY327_FMwebp_QL65_.jpg",
      "price": "200",
      "rating": "5",
      "featured": false,
      "id": 4
    },
    {
      "name": "JavaScript from Beginner to Professional",
      "author": " Laurence Lars Svekis",
      "thumbnail": "https://m.media-amazon.com/images/I/71oZ45OrLjL._SY425_.jpg",
      "price": "350",
      "rating": "4",
      "featured": true,
      "id": 5
    },
    {
      "name": "JavaScript All-in-One For Dummies",
      "author": "Chris Minnick ",
      "thumbnail": "https://m.media-amazon.com/images/I/81ycHtBjMWL._AC_UY327_FMwebp_QL65_.jpg",
      "price": "300",
      "rating": "5",
      "featured": true,
      "id": 6
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
  const bookId = parseInt(req.params.id);
  const book = booksData.books.find((b) => b.id === bookId);

  if (!book) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }

  res.json(book);
});

// Create a new book
app.post('/books', (req, res) => {
  const newBook = req.body;

  // Assign a new unique ID to the book
  newBook.id = booksData.books.length + 1;

  // Add the new book to the data
  booksData.books.push(newBook);

  res.status(201).json(newBook);
});

// Patch a book by ID
app.patch('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedFields = req.body;

  const index = booksData.books.findIndex((b) => b.id === bookId);

  if (index === -1) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }

  // Update the existing book with only the provided fields
  booksData.books[index] = { ...booksData.books[index], ...updatedFields };

  res.json(booksData.books[index]);
});


// Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);

  const index = booksData.books.findIndex((b) => b.id === bookId);

  if (index === -1) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }

  // Remove the book from the array
  const deletedBook = booksData.books.splice(index, 1)[0];

  res.json(deletedBook);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
