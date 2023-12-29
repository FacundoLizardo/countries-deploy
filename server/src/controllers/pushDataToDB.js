const dataFromApi = require("../utils/getDataFromApi");
const { Country } = require("../db");

const sendDataToDb = async () => {
	try {
		const countries = await dataFromApi();
		await Country.bulkCreate(countries);
		console.log("Data sent to database successfully");
	} catch (error) {
		console.error("Error sending data to database:", error.message);
	}
};

module.exports = sendDataToDb;
