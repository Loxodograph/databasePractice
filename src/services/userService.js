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
      email: String(transactionData.email),
      username: String(transactionData.username),
      passwordHash: String(transactionData.passwordHash),
    }
  });

}

export { getAllUsers, createUser, getUserByUsername };