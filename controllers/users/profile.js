const users = require("../../models").user;

module.exports = async (req, res) => {
  const session = req.session;
  const {
    email,
    password,
    username,
    phone_number,
    birthday,
    user_region,
    user_position,
    user_status,
    userId,
  } = req.body;
  try {
    await users
      .update(
        {
          username: username,
          password: password,
          phone_number: phone_number,
          birthday: birthday,
          user_region: user_region,
          user_position: user_position,
          user_status: user_status,
        },
        { where: { id: userId } }
      )
      .then(res.status(200).send("등록되었습니다."));
  } catch (error) {
    res.status(401).send(err);
    console.error(error);
  }
};
