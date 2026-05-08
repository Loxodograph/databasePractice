import { prisma } from "../config/db.js";

async function getAllAccountsByUserId(userId) {
  return await prisma.accounts.findMany( {
    where: {
      userId: userId
    }
  });
}

async function createAccount(accountData) {
  return await prisma.accounts.create({
    data: {
      userId: Number(accountData.userId),
      balance: Number(accountData.balance),
      accountType: String(accountData.accountType),
    }
  })
}

export {getAllAccountsByUserId, createAccount};