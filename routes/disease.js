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

//#region  Unity Testing Endpoint
router.get('/projectData', (req, res) => {
    // console.log("ProjectData")
    res.json({
        ProjectName: 'ColumbiaCenter',
        fbxurl: 'https://zeblobstorage.blob.core.windows.net/zeblob/AutomateAssetbundle/LigneRoset_Kaschkasch_mat.skp',
        BuildAssetBundleOptions: 'ChunkBasedCompression',
        BuildTargets: [
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
//#endregion

//Get list of cancer disease
router.get('/diseasedata', (req, res, err) => {
    try {
        db.query('SELECT * from disease', (err, rows, fields) => {
            res.status(200).json(rows)
        })
    } catch (error) {

    }
})

router.get('/diseasedata/:id', (req, res, err) => {
    db.query('SELECT * FROM disease WHERE id = ?', [req.params.id], (err, rows, fields) => {
        res.status(200).json(rows)
    })
})


//Adding new diseases from the portal
router.post('/addDisease/', (req, res, err) => {
    db.query(`INSERT INTO disease(id, name, created_at) values(?, ?, ?)`,
        [
            req.query.id,
            req.query.diseases,
            req.query.created_at,
        ],
        (err, rows, fields) => {
            if (err)
                return res.status(500).json(err)
            return res.json(rows);
        })
})


router.put('/updateDisease', (req, res, err) => {
    db.query('update disease set diseases = ? where id = ?',
        [
            req.query.diseases,
            req.query.id
        ],
        (err, rows, fields) => {
            if (err)
                return res.status(500).json(err)
            return res.json(rows).status(200)
        })
})


router.delete('/deletedisease', (req, res, err) => {
    db.query('delete from disease where id = ?',
        [
            req.query.id   //
        ],
        (err, rows, fields) => {
            if (err)
                return res.status(500).json(err)
            return res.status(200).json(rows)
        })
})

module.exports = router