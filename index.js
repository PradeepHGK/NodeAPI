//#region Express 
const express = require('express');
var router = express.Router()
var expressApp = express();
//#endregion
require('dotenv').config()



const bodyParser = require('body-parser');
var portNo = process.env.APP_PORT
expressApp.use(express.json())
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }))


//#region  Routing 
expressApp.use('/', require('./routes/disease'))
expressApp.use('/natural', require('./routes/naturalMedicine'))
//#endregion

expressApp.listen(portNo,()=> {
    console.log('Express server Started');
});

module.exports = {express:expressApp, parser: bodyParser, router:router}
