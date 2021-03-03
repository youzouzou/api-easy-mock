var express = require('express');
const JSONUtil = require('../util/file');
var router = express.Router();
const jsonPath = "./json/";

router.get('/getAllApi', function (req, res, next) {
    const jsonFileList = JSONUtil.getFileList(jsonPath);
    const jsonList = []
    jsonFileList.map(item => {
        const json = JSONUtil.getJson(jsonPath + item);
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

router.delete('/deleteApi', function (req, res, next) {
    console.log(req.query.api)
    if (req.query.api) {
        JSONUtil.deleteJSON(req.query.api);
        res.send(JSON.stringify(req.query.api))
    }
})

module.exports = router;
