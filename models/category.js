const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },

});

const Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = Category;
