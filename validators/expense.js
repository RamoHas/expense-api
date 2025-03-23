import Joi from "joi";


export const addExpenseValidator = Joi.object({
    name: Joi.string().required(),
    amount: Joi.number().required(),
    category: Joi.string().required(),
});