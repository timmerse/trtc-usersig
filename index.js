'use strict';

// Try to read .env manually, for directly run node.
const dotenv = require('dotenv');
const fs = require('fs');
if (!process.env.STAGE) {
  process.env.STAGE = 'local';
  ['.env', '.env.local'].map(filename => {
    if (fs.existsSync(filename)) dotenv.config({path: filename});
  });
}

const Koa = require('koa');
const Router = require('koa-router');
const Cors = require('koa2-cors');
const BodyParser = require('koa-bodyparser');
const moment = require('moment');
const TLSSigAPIv2 = require('tls-sig-api-v2');

// Global config, from .env.
const sdkAppId = process.env.TRTC_TIM_APPID;
const secretKey = process.env.TRTC_TIM_SECRET;

const app = new Koa();
app.use(Cors());
app.use(BodyParser());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.body = {
      errorCode: 10000,
      errorMessage: e.message || 'Unknown error',
    };
    console.log(e);
  }
});

// Check required config, user MUST set it in .env or serverless.yml
app.use(async (ctx, next) => {
  if (!sdkAppId || !secretKey || sdkAppId === 'xxxxxxxxxxxxxxxx' || secretKey === 'xxxxxxxxxxxxxxxx') {
    throw new Error(`Invalid TRTC config, please check .env.${process.env.STAGE} file`);
  }

  await next();
});

const router = new Router();
router.all('/', async (ctx) => {
  const {userId} = ctx.request.query;
  if (!userId) throw new Error('no param userId');

  // Generate TRTC userSig, see https://cloud.tencent.com/document/product/647/17275
  const expire = moment.duration(72, 'hours');
  const userSig = new TLSSigAPIv2.Api(
    sdkAppId, secretKey,
  ).genSig(
    userId, expire.asSeconds(),
  );

  const expireAt = moment().add(expire).format();
  console.log(`usersig sdkAppId=${sdkAppId}, userId=${userId}, expire=${expire}, expireAt=${expireAt}, userSig=${userSig.length}B`);

  ctx.body = {
    errorCode: 0,
    data: {
      sdkAppId: sdkAppId,
      userId: userId,
      userSig: userSig,
      expireAt: expireAt,
    }
  };
});
app.use(router.routes());

// Redirect /${stage}/xxx to /xxx
const prefixedRouter = new Router({
  prefix: `/${process.env.STAGE}`
});
prefixedRouter.use(router.routes());
app.use(prefixedRouter.routes());

app.listen(9000, () => {
  console.log(`Server start on http://localhost:9000`);
});

