'use strict';

const moment = require('moment');
const TLSSigAPIv2 = require('tls-sig-api-v2');

exports.main_handler = async (event, context) => {
  const {userId} = event.queryString;
  if (!userId) throw new Error('no param userId');

  const sdkAppId = parseInt(process.env.TRTC_SDK_APPID);
  const expire = moment.duration(72, 'hours');

  const userSig = new TLSSigAPIv2.Api(
    sdkAppId, process.env.TRTC_SECRET_KEY,
  ).genSig(
    userId, expire.asSeconds(),
  );

  const expireAt = moment().add(expire).format();
  console.log(`getUserSig sdkAppId=${sdkAppId}, userId=${userId}, expire=${expire}, expireAt=${expireAt}, userSig=${userSig.length}B`);

  return {
    sdkAppId: sdkAppId,
    userId: userId,
    userSig: userSig,
    expireAt: expireAt,
  };
};

