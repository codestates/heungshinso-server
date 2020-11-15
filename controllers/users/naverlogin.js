require('dotenv').config();
const client_id = process.env.NAVER_CLIENT_ID; //개발자센터에서 발급받은 Client ID
const client_secret = process.env.NAVER_CLIENT_SECRET; //개발자센터에서 발급받은 Client Secret
let state = '12345'; // random 문자열
const redirectURI = encodeURI(
  'http://3.35.21.164:3000/users/signin/naverlogin/callback'
);
let api_url = '';
module.exports = {
  get: (req, res) => {
    api_url =
      'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' +
      client_id +
      '&redirect_uri=' +
      redirectURI +
      '&state=' +
      state;
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.end(
      "<a href='" +
        api_url +
        "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>"
    );
  },
  callback: (req, res) => {
    code = req.query.code;
    state = req.query.state;
    api_url =
      'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' +
      client_id +
      '&client_secret=' +
      client_secret +
      '&redirect_uri=' +
      redirectURI +
      '&code=' +
      code +
      '&state=' +
      state;
    const request = require('request');
    const options = {
      url: api_url,
      headers: {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret,
      },
    };
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.redirect(`https://d2z76t8ifhgwqt.cloudfront.net/?access_token=${body}`);
      } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    });
  },
};
