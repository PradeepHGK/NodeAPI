//#region Express 
const express = require('express');
var router = express.Router()
var expressApp = express();
//#endregion
const parser = require('body-parser');
var portNo = process.env.PORT || 1405

//#region DB Connections
const db = require('mysql');
var dbConnection = db.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1405',
    database : 'cancer'
})
// db connection established

dbConnection.connect((err) => {
    console.log('DB Connection Established')
})
//#endregion


//Setting port number

expressApp.use('/disease', require('./routes/disease'))
expressApp.use('/NatMed', require('./routes/naturalMedicine'))




expressApp.listen(1405,()=> {
    console.log('Express server Started');
});

module.exports = {express:expressApp, parser: parser, router:router, db: dbConnection}
