const dataFromApi = require("../utils/getDataFromApi");
const { Country } = require("../db");
const data = require("../../api/data");

const sendDataToDb = async () => {
	const countries = data.map((country) => ({
		id: country.cca3,
		nombre: country.name.common,
		bandera: country.flags.png,
		continente: country.continents[0],
		capital: country.capital ? country.capital[0] : "Desconocido",
		subregion: country.subregion ? country.subregion[0] : "Desconocido",
		area: country.area,
		poblacion: country.population,
	}));

	try {
		await Country.bulkCreate({ countries });
		console.log("Data sent to database successfully");
	} catch (error) {
		console.error("Error sending data to database:", error.message);
	}
};

module.exports = sendDataToDb;
