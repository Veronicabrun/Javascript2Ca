document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Logg e-posten og passordet før forespørselen
    console.log('Email:', email); // Logger e-posten
    console.log('Password:', password); // Logger passordet

    // Prøv å logge inn med Noroff API
    try {
        const response = await fetch('https://v2.api.noroff.dev/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Noroff-API-Key': '05e991e0-643b-41bd-b4a7-701ca4ae441f'
            },
            body: JSON.stringify({ email, password }) // Sender innloggingsdata
        });

        if (response.ok) {
            const data = await response.json();
            const accessToken = data.data.accessToken;

            // Lagrer access-token i localStorage for senere bruk
            localStorage.setItem('accessToken', accessToken);
            console.log('Access Token:', accessToken); // Logger tokenen
            console.log('Access Token lagret i localStorage:', localStorage.getItem('accessToken')); // Bekreft at tokenet er lagret

            document.getElementById('login-message').innerText = 'Login successful!';
            window.location.href = '/pages/feed/feed.html'; // Redirecter brukeren
        } else {
            const errorData = await response.json();
            document.getElementById('login-message').innerText = 'Login failed: ' + errorData.message;
            console.error('Error:', errorData); // Logger feilresponsen
        }
    } catch (error) {
        console.error("Fetch failed with error:", error);
    }
});
