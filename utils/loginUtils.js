const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is required. Set it in the environment before starting the app.');
}

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
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: maxAge
    });
}


module.exports = { handleErrors, createToken, maxAge }