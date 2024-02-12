var express = require('express');


var router = express.Router();

const Users = require('../models/user');
const Products = require('../models/products');
const Cart = require('../models/cart');
const Categories = require('../models/category');

router.get('/', function (req, res) {
    const user = req.session.user;
    const context = {
        user: user
    }
    res.render('index', context);
});

router.get('/weather', function (req, res) {
    const user = req.session.user

    const context = {
        user: user,
    }
    res.render('weather', context)
})


router.get('/get-weather', async (req, res) => {
    try {
        const { cityName } = req.query;
        const apiKey = 'eaf825f77b9826a2dc0a364e3de2199f';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
        const response = await axios.get(apiUrl);
        const weatherData = response.data;
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/shop', async (req, res) => {
    try {
        const user = req.session.user;

        const categories = await Categories.find();
        const products = await Products.find();
        const cart = await Cart.find({ user });

        const context = {
            user: user,
            categories: categories,
            products: products
        }

        res.render('shop', context);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/cart', (req, res) => {
    const user = req.session.user;


    res.render('cart', context);
})

router.get('/login', (req, res) => {
    const user = req.session.user;

    const context = {
        user: user
    }

    res.render('auth/signin', context);
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    Users.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (user.password !== password) {
                return res.status(401).json({ message: "Incorrect password" });
            }

            req.session.user = user;

            res.redirect('/');
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        });
});



router.get('/register', (req, res) => {
    const user = req.session.user;

    const context = {
        user: user
    }

    res.render('auth/signup', context);
})

router.post('/register', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    const newUser = new Users({ username, email, password });
    newUser.save()
        .then(user => {
            res.redirect('/login');
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;