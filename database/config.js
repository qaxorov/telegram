import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    username: "postgres",
    port: 5432,
    host:'localhost',
    database:'telegram',
    password: 'komila2018',
    dialect: "postgres",
  logging: false,
});


!(async function () {
  try {
    await sequelize.authenticate();
    await sequelize.sync({alter:true});
    console.log("file Db has run");
  } catch (error) {
    console.log("db error: ", error.message);
  }
})
();

 export default sequelize;