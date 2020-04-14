//#region Express 
const express = require('express');
var router = express.Router()
var expressApp = express();
//#endregion

var db = require('./Config/db.config')


const bodyParser = require('body-parser');
var portNo = process.env.PORT || 1405

expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }))


//#region  Routing 
expressApp.use('/disease', require('./routes/disease'))
expressApp.use('/natural', require('./routes/naturalMedicine'))
//#endregion

expressApp.listen(1405,()=> {
    console.log('Express server Started');
});

module.exports = {express:expressApp, parser: bodyParser, router:router}
