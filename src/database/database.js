const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("HotelAcaciasDB", "CloudSAea7bc5bc@hotelacacias", "azure123456-", {
  dialect: "mssql",
  host: "hotelacacias.database.windows.net",
  port: "1433",
});

// Probar conexion con base de datos
async function test(){
    try {
        await sequelize.authenticate()
        console.log("db connected")
        await sequelize.sync()
    } catch (error) {
        console.error(error)
    }
}

module.exports={sequelize,test}
// jdbc:sqlserver://hotelacacias.database.windows.net:1433;database=HotelAcaciasDB;user=CloudSAea7bc5bc@hotelacacias;password=azure123456-;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;
