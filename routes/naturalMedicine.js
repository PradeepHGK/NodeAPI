const express = require('express');
var router = express.Router()
// var dbConnection = require('./disease')

//Getting natural remedies based on the dieases
router
    .route('/medicine')
    .get((req, res)=>
    {
        // dbConnection.database.query('SELECT * from category', (err, rows, fields) => {
        //     res.json(rows)
        // })
    })


router
    .route('/medicine/:cateID/:MedID')
    .get((req, res) => {
        res.json({
            CategoryID: req.params.cateID,
            MedicineID: req.params.MedID
        })
    })
 
module.exports = router