const users = require("../../models").user;

module.exports = async (req, res) => {
  const session = req.session;
  const {
    password,
    username,
    phone_number,
    birthday,
    user_region,
    user_position,
    user_status,
  } = req.body;
  console.log("req.body=======>", req.body);
  try {
    console.log("profile-session===>", session);
    await users
      .findOne({ where: { id: session.cookie.userId } })
      .then((user) => {
        user.update({
          username: username,
          password: password,
          phone_number: phone_number,
          birthday: birthday,
          user_region: user_region,
          user_position: user_position,
          user_status: user_status,
        });
      })
      .then(res.status(200).send("등록되었습니다."));
  } catch (error) {
    res.status(401).send(console.error(error));
  }
};
