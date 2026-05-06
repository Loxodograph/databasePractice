import { prisma } from "../config/db.js"

async function getAllUsers() {
  return await prisma.user.findMany();
}

async function getUserByUsername(username) {
  return await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
}

async function createUser(userData) {

  return await prisma.user.create({
    data: {
      email: String(userData.email),
      username: String(userData.username),
      passwordHash: String(userData.passwordHash),
      salt: String(userData.salt),
    }
  });

}

export { getAllUsers, createUser, getUserByUsername };