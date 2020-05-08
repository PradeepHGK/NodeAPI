//#region Express 
const express = require('express');
var router = express.Router()
var expressApp = express();
//#endregion
var portNo = process.env.APP_PORT


const compression = require('compression')
var helmet = require('helmet');
require('dotenv').config()



const bodyParser = require('body-parser');

expressApp.use(express.json())
expressApp.use(router)
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }))


expressApp.use(compression())   //To compress the response.
expressApp.use(helmet())   //To Protect from web vulnerablities

//#region  Routing 
expressApp.use('/', require('./routes/disease'))
expressApp.use('/natural', require('./routes/naturalMedicine'))
//#endregion

expressApp.listen(1405,()=> {
    console.log('Express server Started');
});

module.exports = {express:expressApp, parser: bodyParser, router:router}
