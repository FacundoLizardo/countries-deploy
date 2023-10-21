const { Router } = require("express");
const countriesRouter = Router();
const {
	getCountrieByIdHandler,
	getCountriesHandler,
} = require("../handlers/countriesHandler");

countriesRouter.get("/:id", getCountrieByIdHandler);

countriesRouter.get("/", getCountriesHandler);

module.exports = countriesRouter;
