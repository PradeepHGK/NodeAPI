//#region DB Connections
const db = require('mysql');
var dbConnection = db.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1405',
    database : 'cancer'
})

dbConnection.connect((err) => {
    console.log('DB Connection Established', err)
})

module.exports = dbConnection
//#endregion





//1. Check for pool in mysql module
//2. To hide the sensitive information use "dotenv" module
//(using process module we can access .env defined variables)
//3. Install "bcrypt" to encrypt password to save it in database