 // Inneholder API-endepunkter og konstanter
// Base API URL
export const API_BASE_URL = 'https://v2.api.noroff.dev';

// Din unike API-nøkkel
export const API_KEY = '05e991e0-643b-41bd-b4a7-701ca4ae441f';

// Auth endpoints
export const REGISTER_ENDPOINT = `${API_BASE_URL}/auth/register`;
export const LOGIN_ENDPOINT = `${API_BASE_URL}/auth/login`;
export const CREATE_API_KEY_ENDPOINT = `${API_BASE_URL}/auth/create-api-key`;

// Post endpoints
export const POSTS_ENDPOINT = `${API_BASE_URL}/social/posts`;
export const POST_BY_ID_ENDPOINT = (id) => `${API_BASE_URL}/social/posts/${id}`;
