const server = require("./src/server");
const { conn } = require("./src/db.js");
const sendDataToDb = require("./src/controllers/pushDataToDB");
require("dotenv").config();

conn
	.sync({ force: true })
	.then(() => {
		server.listen(process.env.PORT, () => {
			console.log("listening at" + process.env.PORT);
			sendDataToDb();
		});
	})
	.catch((error) => console.error(error));
