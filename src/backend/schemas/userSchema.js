const mongoose = require('mongoose');
const mongodb = require('mongodb');
require('dotenv').config({ path: 'config.env' })
const database_link = process.env.DATABASE_LINK;

mongoose.connect(database_link).then(() => {
    console.log('Database connection successful...');
}).catch((err) => {
    console.log(err);
})

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
    },

    college: {
        type: String
    },

    account_type: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User',UserSchema);
