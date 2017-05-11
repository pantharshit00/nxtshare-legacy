const Sequelize =  require('sequelize');

const connection = new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    dialect:process.env.DB_DIALECT,
    host:process.env.DB_HOST
});

connection.sync().then(()=>{
    console.log('Connected to DB at',process.env.DB_HOST);
});

module.exports = connection;