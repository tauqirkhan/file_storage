const { PrismaClient } = require("@prisma/client");
const { addSignedUpUserToUsersTable } = require("../db/queries");
const bcrypt = require("bcrypt");
require("dotenv").config();

const prisma = new PrismaClient();

const postSignUp = async (req, res, next) => {
  try {
    const { username, password, fullname } = req.body;

    //Value stored in .env as string
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.saltValue)
    );

    await addSignedUpUserToUsersTable(username, fullname, hashedPassword);

    res.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = postSignUp;
