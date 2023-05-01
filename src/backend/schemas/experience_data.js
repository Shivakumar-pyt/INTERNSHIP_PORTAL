const mongoose = require('mongoose');
require('dotenv').config({path: 'config.env'});

const database_link = process.env.DATABASE_LINK;

mongoose.connect(database_link).then(() => {
    console.log("Database connection successful...")
}).catch((err) => console.log(err));


const ExperienceDataSchema = new mongoose.Schema({
    experience_id: {
        type: Number,
        required: true,
        unique: true,
    },

    username: {
        type: String,
        required: true,
    },

    company_name: {
        type: String,
        required: true,
    },

    drive: {
        type: String,
        required: true,
    },

    compensation: {
        type: Number,
    },

    rounds: {
        type: Number,
    },

    rounds_info: {
        type: Array,
    },

    selected_count: {
        type: Number,
    },

    total_students: {
        type: Number,
    },

    description: {
        type: String,
    },

    skills: {
        type: Array,
    },


    tips: {
        type: String,
    }
})

module.exports = mongoose.model('experience_data',ExperienceDataSchema);