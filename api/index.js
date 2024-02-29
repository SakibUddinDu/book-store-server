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

// Route to get questions
app.get('/books', (req, res) => {
  // console.log(booksData.books)
  res.json(booksData.books);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
