const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  timezone: '+03:00',
  logging: console.log,   // Logging database requests 
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log(`Succesfull connect to database mysql "${process.env.DB_NAME}"`);
  } catch (error) {
    console.error(`Error occured when connected to database "${process.env.DB_NAME}"`, error);
  }
})();

module.exports = sequelize;
