const users = require("../../models").user;

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const session = req.session;
  try {
    await users
      .findOne({ where: { email: email, password: password } })
      .then((user) => {
        if (!user) {
          res.status(404).send("해당하는 유저가 없거나 비밀번호가 틀립니다.");
        } else {
          session.userId = user.id;
          res.status(200).send({ id: user.id });
        }
      });
  } catch (error) {
    res.status(500).send("서버에서 응답이 없습니다.");
    console.error(error);
  }
};
