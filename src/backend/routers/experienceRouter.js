const express = require('express');
const { addExperience } = require('../controllers/experienceControllers');
const experienceRouter = express.Router();

experienceRouter.post("/add",addExperience);

module.exports = experienceRouter;