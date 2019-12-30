const crypto = require('crypto');

module.exports = slackAuthMiddleware = (req, res, next) => {
  if(req.body.token !== process.env.SLACK_VERIFICATION_TOKEN) {
    res.sendStatus(403);
  }
  next();
}
