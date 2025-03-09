const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAllFoldersArrayOfUser(userId) {
  const foldersArray = await prisma.folders.findMany({
    where: {
      userId: userId,
    },
    include: {
      file: true,
    },
  });

  return foldersArray;
}

async function insertFileInsideFolder(folderId, fileObject) {
  const result = await prisma.file.create({
    data: {
      folderId: folderId,
      filename: fileObject.filename,
      filesize: fileObject.size,
      filePath: fileObject.path,
      fileType: fileObject.fileType,
    },
  });
  return result;
}

async function insertFolderByUser(userId, FolderName) {
  const result = await prisma.folders.create({
    data: {
      userId,
      name: FolderName,
    },
  });

  return result;
}

module.exports = {
  getAllFoldersArrayOfUser,
  insertFileInsideFolder,
  insertFolderByUser,
};
