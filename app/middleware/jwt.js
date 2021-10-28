module.exports = options => {
  return async function jwt(ctx, next) {
    const token = ctx.request.header.authorization;
    let decode = {}
    if (token) {
      try {
        // 解码token
        decode = ctx.app.jwt.verify(token, options.secret);
        ctx.decode = decode;
        // const redis = await ctx.app.center.redis.get('gsound');
        // let power = await redis.hget('gsound.power', decode.id);
        // if (power !== null) power = power.split(','); else power = []
        switch (ctx._matchedRoute) {
          // case '/manage/user/search': { if (power.indexOf('user.select') === -1) { ctx.helper.result({ ctx, data: ctx.helper.STATUS.NOTPOWER, status: 406 }); return; } else await next(); } break;
          default: await next();
        }
      } catch (error) {
        ctx.status = 401;
        ctx.body = {
          message: error.message,
        };
        return;
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        message: 'Authorization has been denied for this request',
      };
      return;
    }
  };
};
