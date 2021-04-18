var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
require('./util/file')

const os = require('os');
if (os.type() == 'Windows_NT') {
  // windows下打开前端项目
  var process = require('child_process');
  process.execSync("start cmd.exe /K run-web.bat")
} else if (os.type() == 'Darwin') {
  // TODO:
  //mac
} else if (os.type() == 'Linux') {
  //Linux
} else {
  //其他
  console.log("不支持该系统")
}

var app = express();

function getJSONList() {
  const JSONUtil = require('./util/file');
  const jsonFileList = JSONUtil.getFileList("./json/");
  const jsonList = []
  jsonFileList.map(item => {
    const json = JSONUtil.getJson("./json/" + item);
    if (json.code == 200) {
      jsonList.push(json.data);
    }
  });
  return jsonList;
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/mockAPI', apiRouter);
// openUrl("http://localhost:3006")

// 用户请求的自定义api将在这里重新匹配
app.use(function (req, res) {
  const jsonList = getJSONList();
  let hasFindResponse = false;
  let result = "未找到该方法";
  jsonList.map(item => {
    if (item.api == req._parsedUrl.pathname && item.method.toUpperCase() == req.method.toUpperCase()) { // api和method匹配到
      if (item.responseList && item.responseList.length > 0) { // 有定义响应数组
        item.responseList.map(paramAndResObj => {
          console.log(paramAndResObj)
          const params = paramAndResObj.params;
          // 将定义中的参数数组与请求参数作比较，只有请求参数的key与value和定义的全部一样，才返回对应结果
          let hasAllKey = true;
          let hasMatchAllValue = true;
          // 遍历定义中的参数数组
          params.map(param => {
            if (!req.query.hasOwnProperty(param.key)) {
              hasAllKey = false;
            } else if (param.value != req.query[param.key]) {
              hasMatchAllValue = false;
            }
          })
          if (hasAllKey && hasMatchAllValue && !hasFindResponse) {
            result = paramAndResObj.response;
            hasFindResponse = true;
          }
        })
      }
      if (!hasFindResponse) {
        result = item.defaultResponse;
      }
    }
  })
  console.log(result)
  res.send(result);
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
