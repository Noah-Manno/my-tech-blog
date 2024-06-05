const commentFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment-content').value;
    const postId = document.querySelector('#current-post').dataset.postId;
    console.log(content)
    console.log(postId)
    if (content && postId) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ content, post_id: postId }), 
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace(`/details/${postId}`);
        }
    }
};
document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.querySelector('#create-comment-form');
    commentForm.addEventListener('submit', commentFormHandler);
});
