import { Sequelize } from "sequelize";

const db = new Sequelize("melobase", "mohamadmsy", "123mohamad23", {
     host: "localhost",
     dialect: "mysql",
});


export default db; 