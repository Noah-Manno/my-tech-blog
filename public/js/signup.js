const signupFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    if (email && username && password) {
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({ email, username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(response);

        if (response.ok) {
            document.location.replace('/')
        } else {
            alert('missing email, username, or password');
        }
    }
};

const signupForm = document.querySelector('#signup-form')
signupForm.addEventListener('submit', signupFormHandler);