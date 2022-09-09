import joi from 'joi';

export const transactionSchema = joi.object({
  type: joi.string().valid('income', 'payment').required(),
  description: joi.string().required(),
  value: joi.number().required(),
});
