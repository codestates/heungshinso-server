require('dotenv').config();
// axios는 HTTP 요청을 하기 위한 라이브러리입니다.
const axios = require('axios');

// GitHub에 OAuth 앱을 등록한 후, 발급받은 client id 및 secret을 입력합니다.
const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
module.exports = {
  get: (req, res) => {
    console.log("hello");
    const requestToken = req.query.code;
    axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
      headers: {
        accept: 'application/json',
      },
    }).then((response) => {
      console.dir(response.data);
      const accessToken = response.data.access_token;
      res.redirect(`http://mylocalbuket.s3-website.ap-northeast-2.amazonaws.com/?access_Token=${accessToken}`);
    });
  },
};
