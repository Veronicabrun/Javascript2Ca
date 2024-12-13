import { getPosts } from '../data/getPosts.js';
import { handleSearchAndFilter } from './handleSearchAndFilter.js';
import { showLoadingIndicator, hideLoadingIndicator } from './loadingIndicator.js';

/**
 * Henter innlegg fra API og viser dem på siden.
 */
export async function renderPosts() {
  const postsContainer = document.querySelector('.list-group');
  const errorContainer = document.querySelector('.error-container'); // Bruk feilmeldingscontaineren
  errorContainer.innerHTML = ''; // Tøm feilmeldingscontaineren

  showLoadingIndicator(); // Vis spinneren

  try {
    console.log("Starter å hente innlegg...");

    // Hent innlegg fra API
    const posts = await getPosts();
    postsContainer.innerHTML = ''; // Tøm innleggskonteineren

    // Gå gjennom hvert innlegg og vis det på siden
    posts.forEach((post) => {
      const mediaUrl = post.media?.url || ''; // Sjekk at media-objektet finnes
      const mediaAlt = post.title || 'Bilde'; // Bruk tittel som fallback for alt-tekst

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

    // Hvis ingen innlegg er funnet
    if (posts.length === 0) {
      console.warn("Ingen innlegg funnet.");
      const noPostsMessage = '<p class="text-danger mt-3">No posts found. Try creating one!</p>';
      errorContainer.innerHTML = noPostsMessage;
    }
  } catch (error) {
    console.error("Feil ved lasting av innlegg:", error);

    // Hvis det oppstår en feil, vis en melding til brukeren
    const errorMessage = '<p class="text-danger mt-3">Failed to load posts. Please try again later.</p>';
    errorContainer.innerHTML = errorMessage;
  } finally {
    hideLoadingIndicator(); // Skjul spinneren uansett resultat
  }
}

// Start med å vise innlegg
handleSearchAndFilter();

// Event listeners for søk og filtrering
document.getElementById('search-input').addEventListener('input', async () => {
  const errorContainer = document.querySelector('.error-container');
  errorContainer.innerHTML = ''; // Tøm feilmeldingscontaineren

  showLoadingIndicator();
  try {
    console.log("Starter søk...");
    await handleSearchAndFilter();
  } catch (error) {
    console.error("Feil ved søk:", error);
    const errorMessage = '<p class="text-danger mt-3">Search failed. Please try again later.</p>';
    errorContainer.innerHTML = errorMessage;
  } finally {
    hideLoadingIndicator();
  }
});

document.getElementById('sort-select').addEventListener('change', async () => {
  const errorContainer = document.querySelector('.error-container');
  errorContainer.innerHTML = ''; // Tøm feilmeldingscontaineren

  showLoadingIndicator();
  try {
    console.log("Starter sortering...");
    await handleSearchAndFilter();
  } catch (error) {
    console.error("Feil ved sortering:", error);
    const errorMessage = '<p class="text-danger mt-3">Sorting failed. Please try again later.</p>';
    errorContainer.innerHTML = errorMessage;
  } finally {
    hideLoadingIndicator();
  }
});




