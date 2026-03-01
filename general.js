async function getBooks(queryType, queryValue) {
  try {
    const url = `http://localhost:3000/books?${queryType}=${queryValue}`;
    const response = await axios.get(url);
    
    // Return the book details if the request is successful
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    return { message: 'Error retrieving books.' };
  }
}