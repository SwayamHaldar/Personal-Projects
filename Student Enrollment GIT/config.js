import { Sequelize } from "sequelize";

const sequel = new Sequelize("Enrollment", "root", "H6&=3bo0!", {
  host: "localhost",
  dialect: "mysql",
});
export default sequel;
