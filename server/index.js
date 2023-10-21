const server = require("./src/server");
const { conn } = require("./src/db.js");
const PORT = 3001;
const sendDataToDb = require("./src/controllers/pushDataToDB");

conn
	.sync({ force: true })
	.then(() => {
		server.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
			sendDataToDb();
		});
	})
	.catch((error) => console.error(error));
