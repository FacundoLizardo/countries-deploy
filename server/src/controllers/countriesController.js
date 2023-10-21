const { Country, Activity } = require("../db");

const { Op } = require("sequelize");

const getAllCountriesController = async () => {
	const countries = await Country.findAll({
		include: {
			model: Activity,
			attributes: ["nombre", "dificultad", "duracion", "temporada"],
		},
	});

	return countries;
};

const getCountrieByIdController = async (id) => {
	const country = await Country.findByPk(id, {
		include: {
			model: Activity,
			attributes: ["nombre", "dificultad", "duracion", "temporada"],
		},
	});
	return country;
};

const getCountryByNameController = async (name) => {
	const country = await Country.findAll({
		where: { nombre: { [Op.iLike]: `%${name}%` } },
		include: {
			model: Activity,
			attributes: ["nombre", "dificultad", "duracion", "temporada"],
		},
	});
	if (country) return country;
	else return "No se encontro ningun pais con ese nombre";
};

module.exports = {
	getAllCountriesController,
	getCountrieByIdController,
	getCountryByNameController,
};
