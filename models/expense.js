import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const expenseSchema = new Schema(
  {
    name: { type: String, required: true},
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

expenseSchema.plugin(normalize);
export const ExpenseModel = model("Expense", expenseSchema);
