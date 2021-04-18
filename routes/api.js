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

router.get('/getApi', function (req, res, next) {
    const json = JSONUtil.getJson(jsonPath + req.query.api + ".json")
    console.log(req.query.api, json)
    res.send(json);
});


router.post('/addApi', function (req, res, next) {
    const jsonFileList = JSONUtil.getFileList(jsonPath);
    console.log(req.body.data.api)
    const name = req.body.data.api.replace(/\//g, "_");
    const type = req.query.type;
    console.log(jsonFileList, name + '.json')
    if (type === "add" && jsonFileList.indexOf(name + ".json") > -1) {
        res.send(JSON.stringify({
            code: 100,
            msg: "接口已存在"
        }));
        return;
    }
    console.log(name);
    JSONUtil.writeJSON(name, JSON.stringify(req.body.data));
    res.send(JSON.stringify({
        code: 200,
        msg: "添加成功"
    }));
});

router.delete('/deleteApi', function (req, res, next) {
    console.log(req.query.api)
    if (req.query.api) {
        JSONUtil.deleteJSON(req.query.api);
        res.send({
            code: 200
        })
    }
})

module.exports = router;
