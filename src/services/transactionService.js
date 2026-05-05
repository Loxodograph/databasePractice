import { prisma } from "../config/db.js"

async function getAllTransactions() {
  return await prisma.transactions.findMany();
}

async function createTransaction(transactionData) {

  return await prisma.transactions.create({
    data: {
      accountId: Number(transactionData.accountId),
      categoryId: Number(transactionData.categoryId),
      amount: String(transactionData.amount),
      date: transactionData.date ? new Date(transactionData.date) : new Date(),
      description: transactionData.description // only if it exists in schema
    }
  });
}

async function deleteTransaction(transactionData) {
  return prisma.transactions.delete({
    where: {
      id: transactionData,
    },
  })

};

export { getAllTransactions, createTransaction, deleteTransaction };