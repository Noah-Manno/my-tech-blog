const updatePostHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#update-post-content').value;
    const postId = document.querySelector('#current-post').dataset.postId;

    if (content) {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert('missing content')
        }
    }
};

const updatePostForm = document.querySelector('#update-post-form');
updatePostForm.addEventListener('submit', updatePostHandler);

const deletePostHandler = async (event) => {
    event.preventDefault();

    const postId = document.querySelector('#current-post').dataset.postId;

    if (postId) {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert('missing content')
        }
    }
};

const deletePost = document.querySelector('#delete-confirm');
deletePost.addEventListener('click', deletePostHandler);