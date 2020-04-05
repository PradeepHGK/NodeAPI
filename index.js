//#region Express 
const express = require('express');
var expressApp = express();
const router = express.Router();
//#endregion

const parser = require('body-parser');

//#region DB Connections
const db = require('mysql');
var dbConnection = db.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1405',
    database : 'cancer'
})

dbConnection.connect((err) => {
    console.log('DB Connection Established')
})
//#endregion


//Setting port number
var portNo = process.env.PORT || 1405

router.use('/api', router)

//Event Listener



// Enabling db connection

//getting category list
expressApp.get('/category', (req, res) => {
    console.log('Get User')
    // res.send('user list')
    res.json({
        "category": [
            {
                name: 'Lungs',
                hospital: "",
                contact: "",
                Testimonials: ""

            },
            {
                name: 'Nasopharel',
                hospital: "",
                contact: "",
                Testimonials: ""
            }
        ]
    })
});


expressApp.listen(portNo,()=> {
    console.log('Express server Started' + dbConnection.threadId);
});

module.exports = {express:expressApp, parser: parser}
