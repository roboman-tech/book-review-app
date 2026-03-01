const axios = require('axios');

// Function to fetch books based on a given query (author, title, or ISBN)
// It accepts two parameters: queryType (author, title, or isbn) and queryValue (value to search for)
async function getBooks(queryType, queryValue) {
  try {
    // Construct the URL dynamically based on queryType and queryValue
    const url = `http://localhost:3000/books?${queryType}=${queryValue}`;
    const response = await axios.get(url); // Send GET request to the server
    
    // Check if the response contains no data
    if (response.data.length === 0) {
      return { message: `No books found for ${queryType}: ${queryValue}` };
    }

    // Return the books if found
    return {
      message: `Books found for ${queryType}: ${queryValue}`,
      books: response.data
    };
  } catch (error) {
    // Handle specific HTTP response errors (e.g., 404, 500)
    if (error.response) {
      if (error.response.status === 404) {
        return { message: 'Books not found.' };
      }
      return { message: `Error: ${error.response.status} - ${error.response.data.message}` };
    } else if (error.request) {
      // If no response was received
      return { message: 'No response received from the server.' };
    } else {
      // General error handling
      return { message: `Error in making the request: ${error.message}` };
    }
  }
}

// Example usage with different filters:
// Fetching books by author 'George Orwell'
(async () => {
  const booksByAuthor = await getBooks('author', 'George Orwell');
  console.log('Books by George Orwell:', booksByAuthor);

  // Fetching books with title 'The Great Gatsby'
  const booksByTitle = await getBooks('title', 'The Great Gatsby');
  console.log('Books with title "The Great Gatsby":', booksByTitle);

  // Fetching books with ISBN '9780743273565'
  const booksByISBN = await getBooks('isbn', '9780743273565');
  console.log('Books with ISBN "9780743273565":', booksByISBN);
})();