import { Router } from "express";
import { addExpense, deleteExpense, getExpensesbyID } from "../controllers/expense.js";

const expenseRouter = Router();

expenseRouter.post("/expense", addExpense),
expenseRouter.get('/expense', getExpensesbyID);
expenseRouter.delete('/expense/:id', deleteExpense);
// expenseRouter.get("/expense", getExpenses)
export default expenseRouter;