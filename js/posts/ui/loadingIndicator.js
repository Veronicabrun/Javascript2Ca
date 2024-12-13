export function showLoadingIndicator() {
    console.log('Viser ladeindikator');
    const loader = document.createElement('div');
    loader.id = 'loading-indicator';
    loader.innerHTML = `
      <div class="spinner-overlay">
        <div class="spinner"></div>
      </div>
    `;
    document.body.appendChild(loader);
    console.log("Ladeindikatoren ble lagt til DOM");
  }
  
  export function hideLoadingIndicator() {
    console.log('Skjuler ladeindikator');
    const loader = document.getElementById('loading-indicator');
    if (loader) {
      document.body.removeChild(loader);
    }
  }
  
  