const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const postSignUp = async (req, res) => {
  try {
    const { username, password, fullname } = req.body;
    await prisma.users.create({
      data: {
        username,
        fullname,
        password,
      },
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = postSignUp;
