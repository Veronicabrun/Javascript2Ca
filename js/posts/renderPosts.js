import { getPosts } from './getPosts.js';

/**
 * Henter innlegg fra API og viser dem på siden.
 */
async function renderPosts() {
  const postsContainer = document.querySelector('.list-group');
  postsContainer.innerHTML = '';

  try {
    const posts = await getPosts();
    posts.forEach((post) => {
      const postHTML = `
        <div class="list-group-item d-flex flex-column flex-md-row align-items-start">
          <img src="${post.media}" alt="${post.title}" class="me-3 mt-2 mb-2 image-size">
          <div>
            <h5 class="mb-1 mt-2">${post.title}</h5>
            <p class="mb-1">${post.body}</p>
            <small class="text-muted">Opprettet: ${new Date(post.created).toLocaleDateString()}</small>
          </div>
        </div>
      `;
      postsContainer.innerHTML += postHTML;
    });
  } catch (error) {
    console.error('Feil ved visning av innlegg:', error);
  }
}

renderPosts();



