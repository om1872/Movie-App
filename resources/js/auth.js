const loginForm = document.forms['login-main-form'];
const passErr = document.querySelector('.pass-err');
const emailErr = document.querySelector('.email-err');
const signUpForm = document.forms['signup-main-form'];

async function sendLogin(e) {
    e.preventDefault();
    const email = loginForm['email'].value
    const password = loginForm['password'].value;
    console.log(email, password);
    passErr.textContent = '';
    emailErr.textContent = '';
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password })
    });

    const data = await res.json();
    if (data.error == 1) {
        const errors = data['error-obj'];
        console.log(errors, data);
        emailErr.textContent = errors.email;
        passErr.textContent = errors.password;
    } else {
        location.reload();
    }
}

async function sendSignup(e) {
    e.preventDefault();
    const email = signUpForm['email'].value
    const password = signUpForm['password'].value;
    const username = signUpForm['first'].value + ' ' + signUpForm['last'];
    passErr.textContent = '';
    emailErr.textContent = '';
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, email: email, password: password })
    });

    const data = await res.json();
    if (data.error == 1) {
        const errors = data['error-obj'];
        console.log(errors, data);
        emailErr.textContent = errors.email;
        passErr.textContent = errors.password;
    } else {
        location.reload();
    }
}

loginForm.addEventListener('submit', sendLogin);
signUpForm.addEventListener('submit', sendSignup);
document.forms.forEach(form => form.addEventListener('keyup keypress'), (e) => {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
        e.preventDefault();
        return false;
    }
})