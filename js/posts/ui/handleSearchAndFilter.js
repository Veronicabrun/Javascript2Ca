import { getPosts } from '../data/getPosts.js';
import { searchPosts } from '../data/searchPosts.js';
import { filterPosts } from '../data/filterPosts.js';
import { renderPosts } from './renderPosts.js';

export async function handleSearchAndFilter() {
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');

  // Fetch user input
  const query = searchInput.value.trim(); 
  const sortBy = sortSelect.value; 

  try {
    // Fetch posts from the API (with or without search)
    const posts = query ? await searchPosts(query) : await getPosts();

    // Filter posts based on the sorting method
    const sortedPosts = filterPosts(posts, sortBy);

    // Send the filtered posts to renderPosts
    await renderPosts(sortedPosts); // Updated to accept filtered posts
  } catch (error) {
    console.error('Error while handling search and filtering:', error);
  }
}
