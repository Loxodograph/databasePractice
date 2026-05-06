import { prisma } from "../config/db.js"
import * as bcrypt from 'bcryptjs';

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
  const hash = await bcrypt.hash(userData.password, 10);

  return await prisma.user.create({
    data: {
      email: String(userData.email),
      username: String(userData.username),
      passwordHash: hash,
      createdAt: new Date()
    }
  });

}

export { getAllUsers, createUser, getUserByUsername };