const mongoose = require('mongoose');
const mongodb = require('mongodb');

const database_link = "mongodb+srv://shivakumar_ranade:sbr2002%40wt@cluster0.1akbtlo.mongodb.net/?retryWrites=true&w=majority";

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
    }
})

module.exports = mongoose.model('User',UserSchema);
