const axios = require('axios');

// Function to fetch books based on a given query (author, title, or ISBN)
async function getBooks(queryType, queryValue) {
  try {
    const url = `http://localhost:3000/books?${queryType}=${queryValue}`;
    const response = await axios.get(url);

    // Check if books were found
    if (response.data.length === 0) {
      return { message: `No books found for ${queryType}: ${queryValue}` };
    }

    // Return book details if the request is successful
    return {
      message: `Books found for ${queryType}: ${queryValue}`,
      books: response.data
    };
  } catch (error) {
    // Handle specific HTTP response errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 404) {
        return { message: 'Books not found.' };
      }
      return { message: `Error: ${error.response.status} - ${error.response.data.message}` };
    } else if (error.request) {
      // The request was made but no response was received
      return { message: 'No response received from the server.' };
    } else {
      // Something else happened in setting up the request
      return { message: `Error in making the request: ${error.message}` };
    }
  }
}

// Example usage with different filters:
(async () => {
  const booksByAuthor = await getBooks('author', 'George Orwell');
  console.log('Books by George Orwell:', booksByAuthor);

  const booksByTitle = await getBooks('title', 'The Great Gatsby');
  console.log('Books with title "The Great Gatsby":', booksByTitle);

  const booksByISBN = await getBooks('isbn', '9780743273565');
  console.log('Books with ISBN "9780743273565":', booksByISBN);
})();