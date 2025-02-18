const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const postSignUp = async (req, res, next) => {
  try {
    const { username, password, fullname } = req.body;
    const result = await prisma.users.create({
      data: {
        username,
        fullname,
        password,
        folders: {
          create: {
            name: `${fullname}'s files`,
          },
        },
      },
      include: {
        folders: true,
      },
    });
    console.log(result);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = postSignUp;
