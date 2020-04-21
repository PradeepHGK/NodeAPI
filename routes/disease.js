const express = require('express');
var router = express.Router()
const multer = require('multer')

var db = require('../Config/db.config')

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Assetbundle");
        console.log("Storage")
    },
    filename: function (req, file, callback) {
        console.log("Storage_" + file.fieldname + "_" + file.originalname)
        callback(null, file.fieldname + "_" + file.originalname);
    }
});


var upload = multer({
    storage: Storage
}).fields([
    { name: 'Android', maxCount: 1 },
    { name: 'iOS', maxCount: 1 },
    { name: 'WSAPlayer', maxCount: 1 },
    { name: 'Standalone', maxCount: 1 }
])

router.get('/projectData', (req, res) => {
    // console.log("ProjectData")
    res.json({
        ProjectName: 'ColumbiaCenter',
        fbxurl: 'https://dl.dropboxusercontent.com/s/v1xzm2l597tqhvr/aj%40Rifle%20Punch.fbx?dl=0',
        BuildAssetBundleOptions: 'UncompressedAssetBundle',
        BuildTargets:[
                'iOS',
                'Android',
                'WSAPlayer',
                'Standalone'
        ],
        isDollhouseDisabled: false,
        isRealScaleDisabled: false,
    })
})

router.post('/projectData/Upload', (req, res, err) => {
    // res.send('Uploaded')
    console.log("UploadAssetbundle")
    upload(req, res, function (err) {
        return res.json({
            status: 'sucess',
            message: 'Assetbundle Uploaded Sucessfully'
        })
    })
})


//Get list of cancer disease
router.get('/diseasedata', (req, res, err) => {
    db.query('SELECT * from category', (err, rows, fields) => {
        res.status(200).json(rows)
    })
})

router.get('/diseasedata/:categoryID', (req, res, err) => {
    db.query('SELECT * FROM category WHERE category_id = ?', [req.params.categoryID], (err, rows, fields) => {
        res.status(200).json(rows)
    })
})


//Adding new diseases from the portal
router.post('/addDisease/', (req, res, err)=>{
    db.query(`INSERT INTO category(category_id, name, created_at) values(?, ?, ?)`, 
    [
        req.query.category_id,
        req.query.name,  
        req.query.created_at,
    ], 
    (err, rows, fields)=>{
        if(err)
            return res.status(500).json(err)
        return res.json(rows);
    })
})


router.put('/updateDisease', (req, res, err)=>{
    db.query('update category set name = ? where category_id = ?', 
    [
        req.query.name,
        req.query.category_id
    ], 
    (err, rows, fields)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json(rows).status(200)
    })
})


router.delete('/deletedisease', (req, res, err)=>{
    db.query('delete from category where category_id = ?', 
    [
        req.query.category_id
    ], 
    (err, rows, fields)=>{
        if(err)
            return res.status(500).json(err)
        return res.status(200).json(rows)
    })
})

module.exports = router