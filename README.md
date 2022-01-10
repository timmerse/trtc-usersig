# TRTC-USERSIG

SCF for [generating userSig](https://cloud.tencent.com/document/product/647/17275) for TRTC.

## Develop

First, setup the `.env` environment:

```
TRTC_TIM_APPID=xxxxxxxxx
TRTC_TIM_SECRET=xxxxxxxxx
```

Please install depends:

```bash
npm install
```

Run locally by:

```
node .
```

Open te HTTP-API: http://localhost:9000/?userId=1000

## Production

First, setup the `.env` environment:

```
TRTC_TIM_APPID=xxxxxxxxx
TRTC_TIM_SECRET=xxxxxxxxx
```

Please install depends:

```bash
npm install
```

Then, deploy SCF to tencent cloud by [sls](https://cloud.tencent.com/document/product/583/44753):

```bash
sls deploy
```

Open the HTTP-API: https://service-xxx-xxx.gz.apigw.tencentcs.com/?userId=user001

> Note that the API gateway is automatically create by sls.

2021.09

