const dataFromApi = require("../utils/getDataFromApi");
const { Country } = require("../db");

const sendDataToDb = async () => {
	try {
		const countries = await dataFromApi();

		await Country.bulkCreate(countries);
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = sendDataToDb;
