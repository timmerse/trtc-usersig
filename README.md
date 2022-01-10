# TRTC-USERSIG

SCF for [generating userSig](https://cloud.tencent.com/document/product/647/17275) for TRTC.

## Production

推荐使用云函数发布到线上环境，也可以和自己的服务发布在一起。

首先，需要开通腾讯云资源：

* [开通API网关](https://console.cloud.tencent.com/apigateway/service?rid=1)，通过API网关访问云函数，提供HTTP API。
* [开通COS存储](https://console.cloud.tencent.com/cos5)，保存云函数代码用的。
* [开通SLS日志服务](https://console.cloud.tencent.com/cls/overview?region=ap-guangzhou)，云函数保存日志用的。
* [云函数授权](https://console.cloud.tencent.com/scf/list?rid=1&ns=default)，云函数访问其他云资源用的。

接着，安装云函数工具[serverless/sls](https://cloud.tencent.com/document/product/583/44753)，安装依赖库：

```bash
npm install -g serverless
npm install
```

> Note: 若安装sls有问题，请看官方说明文档[sls](https://cloud.tencent.com/document/product/583/44753)，有详细解决办法。

> Note: 关于Node安装，请参考[nodejs](https://nodejs.org/zh-cn/download/)，在Windows下请使用Administrator权限启动`Node.js command prompt`，不支持PowerShell。

然后，设置环境变量`.env`:

```
TRTC_TIM_APPID=xxxxxxxxx
TRTC_TIM_SECRET=xxxxxxxxx
```

最后，发布云函数:

```bash
sls deploy
```

浏览器打开地址: https://service-xxx-xxx.gz.apigw.tencentcs.com/?userId=user001

> 注意上面网关的地址和HTTPS证书都是API网关自动生成的，可以在发布的日志中看到.

## Develop

这个项目使用的是Nodejs的KOA框架，也可以本地运行。

首先，设置环境变量`.env`:

```
TRTC_TIM_APPID=xxxxxxxxx
TRTC_TIM_SECRET=xxxxxxxxx
```

安装依赖：

```bash
npm install
```

运行本地服务：

```
node .
```

浏览器打开地址，可以看到生成的TRTC的userSig： http://localhost:9000/?userId=1000

2021.09

