# TRTC-USERSIG

SCF for [generating userSig](https://cloud.tencent.com/document/product/647/17275) for TRTC.

## Usage

First, setup the `.env` environment:

```
TENCENT_SECRET_ID=xxxxxxxxx
TENCENT_SECRET_KEY=xxxxxxxxx

TRTC_SDK_APPID=xxxxxxxxx
TRTC_SECRET_KEY=xxxxxxxxx
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

