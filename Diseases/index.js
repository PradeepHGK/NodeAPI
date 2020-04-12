const express = require('express');
var router = express.Router()
const multer = require('multer')

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
    res.json({
        ProjectName: 'ModeraRedmond',
        fbxurl: 'https://dl.dropboxusercontent.com/s/lgdcha4hefen21i/DollhouseFil.fbx?dl=0',
        BuildAssetBundleOptions: 'UncompressedAssetBundle',
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
router.get('/disease', (req, res, err)=>{
    if(err)
    {
        console.log("Error", err)
    }
    else
    {
        res.status(200)
        res.json({
            // get the list of disease and properties from DB

        })
    }
})
    .post('/diseases/', (req, res))
module.exports = router