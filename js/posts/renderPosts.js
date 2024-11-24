import { getPosts } from './getPosts.js';
import { handleSearchAndFilter } from './handleSearchAndFilter.js';

/**
 * Henter innlegg fra API og viser dem på siden.
 */
export async function renderPosts(posts) {
  const postsContainer = document.querySelector('.list-group');
  postsContainer.innerHTML = '';

  posts.forEach((post) => {
    const mediaUrl = post.media?.url || ''; // Sjekk at media-objektet finnes
    const mediaAlt = post.media?.alt || post.title || 'Bilde'; // Fallback for alt-tekst

    const imageHTML = mediaUrl
      ? `<img src="${mediaUrl}" alt="${mediaAlt}" class="me-3 mt-2 mb-2 image-size">`
      : '';

    const postHTML = `
      <div class="list-group-item d-flex flex-column flex-md-row align-items-start">
        ${imageHTML}
        <div>
          <h5 class="mb-1 mt-2">${post.title}</h5>
          <p class="mb-1">${post.body}</p>
          <a href="/pages/post/post-detail.html?id=${post.id}" class="btn btn-primary mt-2">View Details</a>
          <small class="text-muted">Opprettet: ${new Date(post.created).toLocaleDateString()}</small>
        </div>
      </div>
    `;
    postsContainer.innerHTML += postHTML;
  });
}

// Start med å vise innlegg
handleSearchAndFilter();

// Event listeners for søk og filtrering
document.getElementById('search-input').addEventListener('input', async () => {
  await handleSearchAndFilter();
});

document.getElementById('sort-select').addEventListener('change', async () => {
  await handleSearchAndFilter();
});




