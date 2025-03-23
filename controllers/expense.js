import { ExpenseModel } from "../models/expense.js";
import { addExpenseValidator } from "../validators/expense.js";


export const addExpense = async (req, res, next) => {
   try {
     // console.log(req.auth);
     //Validate the product information
     const { error, value } = addExpenseValidator.validate(
      req.body,
       { abortEarly: false }
     );
     if (error) {
       return res.status(422).json(error);
     }
     //Check if product does not exsit already
     // const count = await ProductModel.countDocuments({
     //   name: value.name
     // });
     // if (count) {
     //   return res.status(409).json('Product with name already exists')
     // }
     //Save product information in database
     const result = await ExpenseModel.create({
       ...value,
       userId: req.auth.id
     });
     //Return response
     res.status(201).json(result);
   } catch (error) {
     if(error.name === 'MongooseError') {
       return res.status(409).json(error.message);
     }
     next(error);
   }
 };

// export const addExpense = async (req, res) => {
//     const { user, amount, category, date } = req.body;
//     try {
//        const expense = new ExpenseModel({ user, amount, category, date });
//        await expense.save();
//        res.status(201).json({ message: 'Expense added', expense });
//     } catch (error) {
//        res.status(400).json({ error: error.message });
//     }
//  };

//  export const getExpenses = async (req, res) => {
//     const { user } = req.query;
//     try {
//        const expenses = await ExpenseModel.find();
//        res.json({ expenses });
//     } catch (error) {
//        res.status(400).json({ error: error.message });
//     }
//  };
 
 export const getExpensesbyID = async (req, res) => {
    const { user } = req.query;
    try {
       const expenses = await ExpenseModel.find({ user });
       res.json({ expenses });
    } catch (error) {
       res.status(400).json({ error: error.message });
    }
 };


 
 export const deleteExpense = async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters
    console.log("Attempting to delete expense with ID:", id); // Debug log
    try {
       const expense = await ExpenseModel.findByIdAndDelete(id); // Delete the expense by ID
       if (!expense) {
          console.log("Expense not found"); // Debug log
          return res.status(404).json({ error: "Expense not found" });
       }
       console.log("Expense deleted:", expense); // Debug log
       res.json({ message: 'Expense deleted' });
    } catch (error) {
       console.error("Error deleting expense:", error); // Debug log
       res.status(400).json({ error: error.message });
    }
 };