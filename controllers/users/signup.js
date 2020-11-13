const user = require("../../models").user;

module.exports = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).send("email , password 정확히 입력해주세요.");
  } else {
    try {
      await user.findOne({ where: { email: email } }).then((data) => {
        if (data) {
          res.status(409).send("email이 존재합니다.");
        } else {
          user
            .create({ email: email, password: password })
            .then((data) => res.status(201).send(data));
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  res.send("signup");
};
