const { Router } = require('express');
const { handleErrors, createToken, maxAge } = require('../utils/loginUtils');
const User = require('../database/User');
const admin_mail = process.env.EMAIL || 'omkumar1872@gmail.com';
const admin_name = process.env.NAME || 'Om Kumar';
const admin_password = process.env.PASSWORD || 'helloworld@1872';

const route = Router();
async function addAdmin() {
    try {
        await User.create({ username: admin_name, email: admin_mail, password: admin_password, admin: true });
    } catch (err) {
        return;
    }
}

route.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    // const hashedPassword = encrypt.hashPassword(password);

    try {
        // console.log(check instanceof mongoose.Document);
        const newUser = new User({
            username: username,
            password: password,
            email: email
        });
        await newUser.save();
        const token = createToken(newUser._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).send({ id: newUser._id, msg: 'Registered Successfully', error: 0 });

    } catch (err) {
        const errors = handleErrors(err);
        res.status(401).send({ 'error-obj': errors, error: 1 });
    }
});

// route.post('/login', passport.authenticate('local'), (req, res) => {
//     res.sendStatus(201);
// });

route.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id, msg: 'Login Successfully', error: 0 });
        console.log('Logined Successfully');
    } catch (err) {
        const errors = handleErrors(err);
        console.log(errors);
        res.status(401).send({ 'error-obj': errors, error: 1 });
    }

})

route.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/api/dashboard');
});

addAdmin();

module.exports = route;
