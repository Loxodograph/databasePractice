import express from "express";
import getAccounts from "../controllers/accountController.js";
const router = express.Router();

router.get('/', getAccounts);

export default router;