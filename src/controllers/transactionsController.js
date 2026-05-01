import { prisma } from "../config/db.js";
import { getAllTransactions } from "../services/transactionService.js";
import { createTransaction as createTransactionService } from "../services/transactionService.js";
const getTransactions = async (req, res) => {
  try {
    const transactions = await getAllTransactions();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Service Error' });
  }
};

const createTransaction = async (req, res) => {
  try {
    const {
      accountId,
      categoryId,
      amount,
      description,
    } = req.body

    const newTransaction = await createTransactionService({
      accountId,
      categoryId,
      amount,
      description,
      date: new Date()
    });

    res.status(200).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export { getTransactions, createTransaction };