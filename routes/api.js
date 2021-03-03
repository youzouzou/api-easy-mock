var express = require('express');
const JSONUtil = require('../util/file');
var router = express.Router();

router.get('/getAllApi', function (req, res, next) {
    const jsonFileList = JSONUtil.getFileList("./json/");
    const jsonList = []
    jsonFileList.map(item => {
        const json = JSONUtil.getJson("./json/" + item);
        if (json.code == 200) {
            jsonList.push(json.data);
        }
    })
    res.send(jsonList);
});

module.exports = router;
