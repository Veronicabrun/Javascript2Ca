async function fetchPosts() {
    const jwtToken = localStorage.getItem('accessToken');
    if (!jwtToken) {
        console.error('Ingen JWT-token funnet! Du må være logget inn for å se innlegg.');
        return;
    }

    try {
        const response = await fetch('https://v2.api.noroff.dev/social/posts?limit=4', {
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'X-Noroff-API-Key': '05e991e0-643b-41bd-b4a7-701ca4ae441f'
            }
        });

        if (!response.ok) {
            throw new Error('Kunne ikke hente innlegg.');
        }

        const posts = await response.json();
        displayPosts(posts.data);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

function displayPosts(posts) {
    const postList = document.getElementById('post-list');
    postList.innerHTML = ''; // Tømmer innholdet først

    posts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.classList.add('list-group-item', 'd-flex', 'flex-column', 'flex-md-row', 'align-items-start');
        postItem.innerHTML = `
            <a href="/pages/post/post-detail.html?id=${post.id}">
                <img src="${post.media?.url || '/images/default.jpg'}" class="me-3 mt-2 mb-2 image-size" alt="${post.media?.alt || 'Post Image'}">
            </a>
            <div>
                <h5 class="mb-1 mt-2">${post.title}</h5>
                <p class="mb-1">${post.body}</p>
                <small class="text-muted">Date: ${new Date(post.created).toLocaleDateString()}</small>
                <div class="mt-2">
                    <small class="text-muted">
                        <i class="bi bi-hand-thumbs-up me-1"></i> Likes: ${post._count?.reactions || 0}
                    </small>
                    <small class="text-muted ms-3">
                        <a href="/pages/post/post-detail.html" class="text-muted text-decoration-none">
                            <i class="bi bi-chat-dots me-1"></i> Comments: ${post._count?.comments || 0}
                        </a>
                    </small>
                </div>
            </div>
        `;
        postList.appendChild(postItem);
    });
}

// Kall funksjonen for å hente innleggene når siden lastes
fetchPosts();

