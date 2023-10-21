const axios = require("axios");

const dataFromApi = async () => {
	const { data } = await axios.get(`http://localhost:5000/countries`);

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

	return countries;
};

module.exports = dataFromApi;
