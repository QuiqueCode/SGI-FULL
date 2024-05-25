import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("incidenciasdb", "root", "", {
  host: "localhost",
  timezone: '-06:00',
  dialect: "mysql",
  underscored: false,
});
