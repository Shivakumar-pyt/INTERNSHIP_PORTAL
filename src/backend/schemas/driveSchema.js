const mongoose = require('mongoose');
require('dotenv').config({path: 'config.env'});

const database_link = process.env.DATABASE_LINK;

mongoose.connect(database_link).then(() => {
    console.log("Database connection successful...")
}).catch((err) => console.log(err));


const DriveSchema = new mongoose.Schema({
    drive_id: {
        type: Number,
        required: true,
        unique: true,
    },

    drive_type: {
        type: String,
        required: true,
    },

    company_name: {
        type: String,
        required: true,
    },

    company_description: {
        type: String,
    },

    pay_per_month: {
        type: Number,
        required: true,
    },

    criteria: {
        type: Object,
        required: true,
    },

    branches: {
        type: Array,
        required: true,
    },

    drive_deadline: {
        type: Date,
        required: true,
    },

    link: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('drive_schema',DriveSchema);