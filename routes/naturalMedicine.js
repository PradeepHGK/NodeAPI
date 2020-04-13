const express = require('express');
var router = express.Router()


//Getting natural remedies based on the dieases
router
    .route('/medicine')
    .get((req, res)=>
    {
        res.json({
            status: 'Sucess'
        })
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