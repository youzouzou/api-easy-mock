var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
require('./util/file')

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
app.use(express.static(path.join(__dirname, 'public/mocker/build')));

app.use('/', indexRouter);
app.use('/mockAPI', apiRouter);

// 用户请求的自定义api将在这里重新匹配
app.use(function (req, res) {
  const jsonList = getJSONList();
  jsonList.map(item => {
    console.log(item.api, req._parsedUrl.pathname)
    console.log(item.method, req.method)
    if (item.api == req._parsedUrl.pathname && item.method.toUpperCase() == req.method.toUpperCase()) { // api和method匹配到
      if (item.responseList && item.responseList.length > 0) { // 有定义响应数组
        let response = null;
        item.responseList.map(paramAndResObj => {
          const params = paramAndResObj.data;
          // 将定义中的参数与请求参数作比较，只有请求参数值与定义的都全部一样，才返回对应结果
          let isMatch = true;
          for (key in params) {
            if (params[key] != req.query[key]) {
              isMatch = false;
              break;
            }
            console.log(params[key]);
          }
          if (isMatch) {
            response = paramAndResObj.response;
          }
        })
        res.send(response);
      } else {
        res.send(JSON.stringify({ val: 222 }));
      }

    }
  })
  res.send("未找到该方法");
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
