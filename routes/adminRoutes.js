var express = require('express');


var router = express.Router();

const Products = require('../models/products');
const Categories = require('../models/category');
router.get('/', function (req, res) {
    const user = req.session.user;
    const context = {

    }
    res.render('/admin/admin', context);
});

router.post('/add_products', async (req, res) => {
    try {
        const product = new Products({ 
            name: 'd', 
            description : 'd', 
            price : 55,
            category : '65ca4fdbcb93e59821e0e5a5'
         });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/add_category', async (req, res) => {
    try {
        const category = new Categories({ 
            name: 'Socks',
         });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router;