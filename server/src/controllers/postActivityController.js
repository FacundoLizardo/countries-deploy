const { Activity, Country } = require("../db");

const postActivityController = async (
	nombre,
	dificultad,
	duracion,
	temporada
) => {
	return await Activity.create({ nombre, dificultad, duracion, temporada });
};

const makeRelationship = async (countryId, activityId) => {
	const country = await Country.findByPk(countryId);
	const activity = await Activity.findByPk(activityId);
	return country.addActivity(activity);
};

module.exports = { makeRelationship, postActivityController };
