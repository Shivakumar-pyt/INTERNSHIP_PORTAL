const express = require('express');
const tnpRouter = express.Router();
const { addCompanyDrive, getUpcomingDrives } = require('../controllers/tnpController');

tnpRouter.post("/addcompany",addCompanyDrive);
tnpRouter.post("/getUpcomingDrives",getUpcomingDrives);
module.exports = tnpRouter;