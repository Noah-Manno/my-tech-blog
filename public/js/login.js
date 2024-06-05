const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(response)

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert('Incorrect password or username');
        }
    }
};

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', loginFormHandler);