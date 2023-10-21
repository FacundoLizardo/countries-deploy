const { Activity, Country } = require("../db");

const getActivities = async (name) => {
	if (name) {
		const activity = await Activity.findAll({
			where: { nombre: name },
			include: [
				{
					model: Country,
					attributes: ["nombre"],
				},
			],
		});
		if (!activity[0]) return "No se encontraron actividades ";

		return activity;
	}
	if (!name) {
		const allActivities = await Activity.findAll({
			include: {
				model: Country,
				attributes: ["nombre"],
			},
		});
		return allActivities;
	}
};

module.exports = getActivities;
