import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("incidenciasdb", "root", "", {
  host: "localhost",
  dialect: "mysql",
  underscored: false,
});
