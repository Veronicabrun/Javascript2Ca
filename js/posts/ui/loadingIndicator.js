export function showLoadingIndicator() {
    const loader = document.createElement('div');
    loader.id = 'loading-indicator';
    loader.innerHTML = `
      <div class="spinner-overlay">
        <div class="spinner"></div>
      </div>
    `;
    document.body.appendChild(loader);
  }
  
  export function hideLoadingIndicator() {
    const loader = document.getElementById('loading-indicator');
    if (loader) {
      document.body.removeChild(loader);
    }
  }
  