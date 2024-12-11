import { getPosts } from '../data/getPosts.js';
import { searchPosts } from '../data/searchPosts.js';
import { filterPosts } from '../data/filterPosts.js';
import { renderPosts } from './renderPosts.js';

export async function handleSearchAndFilter() {
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');

  // Hent brukerens input
  const query = searchInput.value.trim(); // Søketekst
  const sortBy = sortSelect.value; // Valgt filtreringsmetode

  try {
    // Hent innlegg fra API (med eller uten søk)
    const posts = query ? await searchPosts(query) : await getPosts();

    // Filtrer innlegg basert på sorteringsmetode
    const sortedPosts = filterPosts(posts, sortBy);

    // Send de filtrerte innleggene til renderPosts
    await renderPosts(sortedPosts); // Oppdatert for å ta inn filtrerte innlegg
  } catch (error) {
    console.error('Feil ved håndtering av søk og filtrering:', error);
  }
}
