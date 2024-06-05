const addPostHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#post-name').value;
    const content = document.querySelector('#post-content').value;

    if (name && content) {
        const response = await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({ name, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert('missing title or content')
        }
    }
};

const createPostForm = document.querySelector('#create-post-form');
createPostForm.addEventListener('submit', addPostHandler);