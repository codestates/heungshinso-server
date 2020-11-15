require('dotenv').config();
const client_id = process.env.KAKAO_CLIENT_ID; //개발자센터에서 발급받은 Client ID
const client_secret = process.env.KAKAO_CLIENT_SECRET; //개발자센터에서 발급받은 Client Secret
const axios = require('axios');
const qs = require('qs');
const mainUri = 'https://41c8fb3436e7.ngrok.io';
const redirectURI = encodeURI(`${mainUri}users/signin/kakaologin/callback`);
let api_url = '';
let kakaoToken;
module.exports = {
  get: (req, res) => {
    api_url =
      'https://kauth.kakao.com/oauth/authorize?client_id=' +
      client_id +
      '&redirect_uri=' +
      redirectURI +
      '&response_type=code';
    return res.redirect(api_url);
  },
  callback: (req, res) => {
    const { code } = req.query;
    const data = qs.stringify({
      code: code,
      grant_type: 'authorization_code',
      client_id: client_id,
      redirect_uri: redirectURI,
      client_secret: client_secret,
    });
    api_url = 'https://kauth.kakao.com/oauth/token';
    axios({
      method: 'post',
      url: api_url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    })
      .then((response) => {
        kakaoToken = response.data;
        res.redirect(`${mainUri}users/signin/kakaologin/callback/userinfo`);
      })
      .catch((err) => console.log(err));
  },
  userinfo: (req, res) => {
    axios({
      method: 'get',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${kakaoToken['access_token']}`,
      },
    })
      .then((response) => {
        // const kakaoUserId = response.data.id;
        // const kakaoUserConnectedAt = response.data.connected_at;
        // const kakaoUserNickName = response.data.kakao_account.profile.nickname;
        // const kakaoUserBirthDay = response.data.birtyday;
        // const kakaoUserGender = response.data.gender;
        // console.log(response.data);
        // res.cookie(
        //   'kakaoUserId',
        //   kakaoUserId
        //   // 'kakaoUserConnectedAt',
        //   // kakaoUserConnectedAt,
        //   // 'kakaoUserNickName',
        //   // kakaoUserNickName,
        //   // 'kakaoUserBirthDay',
        //   // kakaoUserBirthDay,
        //   // 'kakaoUserGender',
        //   // kakaoUserGender
        // );
        // // res.cookie('kakaoUserConnectedAt', kakaoUserConnectedAt);
        res.send(response.data);
        // res.redirect(mainUri);
      })
      .catch((err) => console.log(err));
  },
};
