 // Håndterer lagring og henting fra localStorage
// Save data to localStorage

export function storeInLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

// Retrieve data from localStorage
export function retrieveFromLocalStorage(key) {
    return localStorage.getItem(key);
}

// Clear specific keys from localStorage
export function clearLocalStorage() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userEmail');
}
