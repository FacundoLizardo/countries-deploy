const getActivities = require("../controllers/getActivitiesController");
const {
	postActivityController,
	makeRelationship,
} = require("../controllers/postActivityController");

const postActivity = async (req, res) => {
	const { nombre, dificultad, duracion, temporada, countryId } = req.body;
	try {
		const newActivity = await postActivityController(
			nombre,
			dificultad,
			duracion,
			temporada
		);

		const { id } = newActivity.dataValues;

		const result = await makeRelationship(countryId, id);
		return res.status(200).json(newActivity);
	} catch (error) {
		return res.status(400).send(error.message);
	}
};

const getActivitiesHandler = async (req, res) => {
	const { name } = req.query;

	try {
		if (name === "undefined") {
			const activities = await getActivities();
			return res.status(200).json(activities);
		} else {
			const result = await getActivities(name);
			return res.status(200).json(result);
		}
	} catch (error) {
		return res.status(404).send(error.message);
	}
};

module.exports = { postActivity, getActivitiesHandler };
