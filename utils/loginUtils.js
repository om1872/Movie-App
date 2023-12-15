const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

//handle errors
const handleErrors = (err) => {
    let errors = { email: '', username: '', password: '' };

    //duplicate error code
    if (err.code === 11000) {
        errors.email = 'Email already registered';
        return errors;
    }
    // bad email or password during login
    if (err.message === 'Incorrect Email') {
        errors.email = 'Email not registered';
    }
    if (err.message === 'Incorrect Password') {
        errors.password = 'Wrong Password';
    }


    if (err.message.includes('users validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
};

//create a json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET || 'my site secret 123', {
        expiresIn: maxAge
    });
}


module.exports = { handleErrors, createToken, maxAge }