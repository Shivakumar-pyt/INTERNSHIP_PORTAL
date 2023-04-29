const mongoose = require('mongoose');
require('dotenv').config({path: 'config.env'});

const database_link = process.env.DATABASE_LINK;

mongoose.connect(database_link).then(() => {
    console.log("Database connection successful...")
}).catch((err) => console.log(err));


const CompanySchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true,
        unique: true,
    },

    no_of_experiences: {
        type: Number,
    },

    experiences: {
        type: Array
    }
})

module.exports = mongoose.model('company',CompanySchema);