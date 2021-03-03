const fs = require('fs');
const jsonPath = "./json/";

function getJson(path) {
    const res = {
        code: 200,
        msg: "获取成功",
        data: null
    }
    try {
        let rawdata = fs.readFileSync(path);
        res.data = JSON.parse(rawdata);
    } catch {
        res.code = 0;
        res.msg = "获取失败";
    }
    return res;
}

function readFileList(path, filesList) {
    var files = fs.readdirSync(path);
    files.forEach(function (itm, index) {
        var stat = fs.statSync(path + itm);
        if (stat.isDirectory()) {
            //递归读取文件
            readFileList(path + itm + "/", filesList)
        } else {
            // var obj = {};//定义一个对象存放文件的路径和名字
            // obj.path = path;//路径
            // obj.filename = itm//名字
            filesList.push(itm);
        }

    })
}

function getFileList(path) {
    var filesList = [];
    readFileList(path, filesList);
    console.log(filesList)
    return filesList;
}

function writeJSON(name, data) {
    fs.writeFileSync(jsonPath + name + '.json', data);
}

function deleteJSON(name) {
    fs.unlinkSync(jsonPath + name + ".json")
}

const JSONUtil = {
    getJson,
    getFileList,
    writeJSON,
    deleteJSON
}

module.exports = JSONUtil;
