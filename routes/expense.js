import { Router } from "express";
import { addExpense, } from "../controllers/expense.js";
import { isAuthenticated , isAuthorized} from "../middlewares/auth.js";

const expenseRouter = Router();
expenseRouter.post(
    "/expense", 
    isAuthenticated,
    isAuthorized(['superadmin', 'admin', 'manager', 'staff']),
    addExpense
  );
// expenseRouter.get('/expense', getExpensesbyID);
// expenseRouter.delete('/expense/:id', deleteExpense);
// expenseRouter.get("/expense", getExpenses)
export default expenseRouter;