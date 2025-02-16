const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAllFoldersArrayOfUser(userId) {
  const foldersArray = await prisma.folders.findMany({
    where: {
      userId: userId,
    },
  });

  return foldersArray;
}

module.exports = { getAllFoldersArrayOfUser };
