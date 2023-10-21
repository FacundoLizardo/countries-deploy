const {
	getAllCountriesController,
	getCountrieByIdController,
	getCountryByNameController,
} = require("../controllers/countriesController");

const getCountrieByIdHandler = async (req, res) => {
	try {
		const { id } = req.params;

		const country = await getCountrieByIdController(id);
		res.status(200).json(country);
	} catch (error) {
		res.status(404).send(error.message);
	}
};

const getCountriesHandler = async (req, res) => {
	const { name } = req.query;

	try {
		const result = name
			? await getCountryByNameController(name)
			: await getAllCountriesController();
		if (!result[0]) return res.status(404).send("Pais no encontrado");

		res.status(200).json(result);
	} catch (error) {
		res.status(404).send({ error: error.message });
	}
};

module.exports = {
	getCountrieByIdHandler,
	getCountriesHandler,
};
