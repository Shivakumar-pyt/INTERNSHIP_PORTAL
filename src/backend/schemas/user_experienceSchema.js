const mongoose = require('mongoose');
require('dotenv').config({path: 'config.env'});

const database_link = process.env.DATABASE_LINK;

mongoose.connect(database_link).then(() => {
    console.log("Database connection successful...")
}).catch((err) => console.log(err));


const UserExperienceSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    no_of_experiences: {
        type: Number,
    },

    companies: {
        type: Array,
    },

    experience_ids: {
        type: Array,
    }
})

module.exports = mongoose.model('user_experience',UserExperienceSchema);