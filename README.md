# API-Easy-Mock

> 最简单<s>好用</s>的api-mock工具


前端：React+Antd

后端：Node+Express

---
### 项目简介

这个项目最开始是因为前端在找mock api工具的时候发现easy-mock竟然挂掉了......

更主要的是，后端这次给的接口，竟然只有一个，不不不，准确点说，是只有一个url请求，通过一个叫作`code`的参数字段来区分不同的接口🤷‍♀️

不知道有没有人也遇到过这样的接口，反正我找了一圈没找到一个适合使用的工具。

刚好最近新学的node+express，所以干脆自己写一个了，反正啪地一下很快啊。

项目只需要你安装`node`环境，再安装一下`node-dev`，无数据库，一键启动，完全免费，值得拥有。

---

### 安装运行

cd 进入项目

`npm install -g  node-dev`安装node-dev模块

`npm i` 安装依赖包

`npm run dev` 运行项目

---

### 效果预览
<img src="https://github.com/youzouzou/api-easy-mock/blob/main/home.jpg">
<img src="https://github.com/youzouzou/api-easy-mock/blob/main/detail.jpg">


---
### 配置修改

项目目前比较简陋，毕竟像我这样遇到如此神奇的接口的人可能不会太多，主要是用来提高自己的日常开发效率。

所以暂时不提供配置接口，需要修改的话就得直接改源码吧。

端口默认为`3006`，如要修改，需同时修改前后端接口。

后端端口在`bin>www.js`中修改;
前端项目源码在`public>mocker`，端口在`src>setProxy.js`中修改，修改完成后需要重新打包，打包完成后将`build`的文件拷贝到`public`中。

---
#### 待实现功能：

- [ ] 项目空间管理
- [ ] 用户登录
- [ ] 用户角色权限
- [ ] 必填项校验
- [ ] 支持json、form、file格式数据
- [ ] 支持全局项配置
- [ ] 支持导出word文档

---

欢迎issue提建议抓bug
