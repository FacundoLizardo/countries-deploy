const { Router } = require("express");
const activitiesRouter = Router();
const {
	postActivity,
	getActivitiesHandler,
} = require("../handlers/activitiesHandler");

activitiesRouter.post("/", postActivity);

activitiesRouter.get("/", getActivitiesHandler);

module.exports = activitiesRouter;
