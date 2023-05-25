import { Sequelize } from "sequelize";

const db = new Sequelize("paginate_db", "root", "Lounited085321", {
	host: "localhost",
	dialect: "mysql",
});

export default db;
