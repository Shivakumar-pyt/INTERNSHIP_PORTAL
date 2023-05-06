const express = require('express');
const { addExperience, getExperiences, saveExperience } = require('../controllers/experienceControllers');
const experienceRouter = express.Router();

experienceRouter.post("/add",addExperience);
experienceRouter.post("/get",getExperiences);
experienceRouter.post("/save",saveExperience);

module.exports = experienceRouter;