const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function addSignedUpUserToUsersTable(username, fullname, password) {
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
}

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
  const result = await prisma.files.create({
    data: {
      folderId: folderId,
      filename: fileObject.originalname,
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

async function deleteFileByFileID(file_id) {
  await prisma.files.delete({
    where: {
      id: file_id,
    },
  });
}

async function checkFileOwnerShip(user_id, file_id) {
  const file = await prisma.files.findFirst({
    where: {
      id: file_id,
      folder: {
        userId: user_id,
      },
    },
  });

  //convert return value to boolean
  return !!file;
}

module.exports = {
  getAllFoldersArrayOfUser,
  insertFileInsideFolder,
  insertFolderByUser,
  addSignedUpUserToUsersTable,
  deleteFileByFileID,
  checkFileOwnerShip,
};
