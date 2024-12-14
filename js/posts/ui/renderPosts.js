import { getPosts } from '../data/getPosts.js';
import { handleSearchAndFilter } from './handleSearchAndFilter.js';
import { showLoadingIndicator, hideLoadingIndicator } from './loadingIndicator.js';
/**
 * Fetches posts from the API and displays them on the page.
 */
export async function renderPosts() {
  const postsContainer = document.querySelector('.list-group');
  const errorContainer = document.querySelector('.error-container'); // Use the error message container
  errorContainer.innerHTML = ''; 

  showLoadingIndicator(); 

  try {
    console.log("Starting to fetch posts...");

    // Fetch posts from the API
    const posts = await getPosts();
    postsContainer.innerHTML = ''; 

    // Loop through each post and display it on the page
    posts.forEach((post) => {
      const mediaUrl = post.media?.url || ''; // Check that the media object exists
      const mediaAlt = post.title || 'Bilde'; // Use the title as a fallback for alt text

      const imageHTML = mediaUrl
        ? `<img src="${mediaUrl}" alt="${mediaAlt}" class="me-3 mt-2 mb-2 image-size">`
        : '';

      const postHTML = `
        <div class="list-group-item d-flex flex-column flex-md-row align-items-start">
          ${imageHTML}
          <div>
            <h5 class="mb-1 mt-2">${post.title}</h5>
            <p class="mb-1">${post.body}</p>
            <a href="/pages/post/post-detail.html?id=${post.id}" class="btn view-details-btn mt-2">View Details</a>
            <small class="text-muted">Opprettet: ${new Date(post.created).toLocaleDateString()}</small>
          </div>
        </div>
      `;
      postsContainer.innerHTML += postHTML;
    });

    // If no posts are found
    if (posts.length === 0) {
      console.warn("No posts found.");
      const noPostsMessage = '<p class="text-danger mt-3">No posts found. Try creating one!</p>';
      errorContainer.innerHTML = noPostsMessage;
    }
  } catch (error) {
    console.error("Error while loading posts:", error);

    // If an error occurs, display a message to the user
    const errorMessage = '<p class="text-danger mt-3">Failed to load posts. Please try again later.</p>';
    errorContainer.innerHTML = errorMessage;
  } finally {
    hideLoadingIndicator(); 
  }
}

// Start by displaying posts
handleSearchAndFilter();

// Event listeners for search and filtering
document.getElementById('search-input').addEventListener('input', async () => {
  const errorContainer = document.querySelector('.error-container');
  errorContainer.innerHTML = ''; 

  showLoadingIndicator();
  try {
    console.log("Starting search...");
    await handleSearchAndFilter();
  } catch (error) {
    console.error("Error during search:", error);
    const errorMessage = '<p class="text-danger mt-3">Search failed. Please try again later.</p>';
    errorContainer.innerHTML = errorMessage;
  } finally {
    hideLoadingIndicator();
  }
});

document.getElementById('sort-select').addEventListener('change', async () => {
  const errorContainer = document.querySelector('.error-container');
  errorContainer.innerHTML = ''; // Clear the error message container

  showLoadingIndicator();
  try {
    console.log("Starting sorting...");
    await handleSearchAndFilter();
  } catch (error) {
    console.error("Error during sorting:", error);
    const errorMessage = '<p class="text-danger mt-3">Sorting failed. Please try again later.</p>';
    errorContainer.innerHTML = errorMessage;
  } finally {
    hideLoadingIndicator();
  }
});




