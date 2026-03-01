const axios = require('axios');

// Configurable URL for the API endpoint
const API_URL = 'http://localhost:3000/books';

// Function to fetch books based on a given query (author, title, or ISBN)
// Accepts two parameters: queryType (author, title, or isbn) and queryValue (the value to search for)
async function getBooks(queryType, queryValue) {
  try {
    // Construct the API request URL dynamically using the queryType and queryValue
    const url = `${API_URL}?${queryType}=${queryValue}`;
    const response = await axios.get(url); // Send a GET request to the API

    // If the response contains no books, return a message indicating no results
    if (response.data.length === 0) {
      return { message: `No books found for ${queryType}: ${queryValue}` };
    }

    // If books are found, return the book details and a success message
    return {
      message: `Books found for ${queryType}: ${queryValue}`,
      books: response.data
    };
  } catch (error) {
    // Handle specific HTTP response errors like 404 (Not Found)
    if (error.response) {
      if (error.response.status === 404) {
        return { message: 'Books not found.' }; // No books were found for the query
      }
      // Other HTTP errors
      return { message: `Error: ${error.response.status} - ${error.response.data.message}` };
    } else if (error.request) {
      // If no response was received from the server
      return { message: 'No response received from the server.' };
    } else {
      // If there's an error in setting up the request
      return { message: `Error in making the request: ${error.message}` };
    }
  }
}

// Example usage with different filters
(async () => {
  // Fetch books by author 'George Orwell'
  const booksByAuthor = await getBooks('author', 'George Orwell');
  console.log('Books by George Orwell:', booksByAuthor);

  // Fetch books with the title 'The Great Gatsby'
  const booksByTitle = await getBooks('title', 'The Great Gatsby');
  console.log('Books with title "The Great Gatsby":', booksByTitle);

  // Fetch books with ISBN '9780743273565'
  const booksByISBN = await getBooks('isbn', '9780743273565');
  console.log('Books with ISBN "9780743273565":', booksByISBN);
})();