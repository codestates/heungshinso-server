const express = require('express');
const router = express.Router();
const models = require('../models');
require('dotenv').config();

router.get('/', (req, res) => {
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
