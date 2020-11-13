const express = require('express');
const router = express.Router();
const models = require('../models');
const axios = require('axios');
const fetch = require('node-fetch');
require('dotenv').config();

router.get('/', (req, res) => {
  const requestToken = req.query.code;
  console.log(req.params);
  console.log("requestToken:" +requestToken);
  const clientID = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  let accessToken;
  if (requestToken) {
    axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
      headers: {
        accept: 'application/json',
      },
    }).then((response) => {
      accessToken = response.data.access_token;
      console.dir("accessToken:"+ accessToken);
     axios('https://api.github.com/user', {
       headers : {
        Authorization: 'token ' + accessToken
       }
     })
        .then((res) => res.json())
        .then((res) => {
          // https://developer.github.com/v3/users/#get-the-authenticated-user
          console.dir(`${res.name}님 환영합니다!`);
        }).catch((err) => console.log("Error"));
    })
  }

  models.user
    .findAll()
    .then((userResult) => {
      if (userResult) {
        models.team.findAll().then((teamResult) => {
          if (teamResult) {
            const resultObj = {};
            resultObj['user'] = userResult;
            resultObj['team'] = teamResult;
            res.status(200).json(resultObj);
          } else {
            res.status(500).send('팀 데이터가 없습니다.');
          }
        });
      } else {
        res.status(500).send('유저 데이터가 없습니다.');
      }
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

module.exports = router;
