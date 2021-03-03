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


router.post('/addApi', function (req, res, next) {
    const name = req.body.api.replace("/", "");
    console.log(name);
    JSONUtil.writeJSON(name, JSON.stringify(req.body));
    res.send(JSON.stringify("添加成功"));
});

module.exports = router;
