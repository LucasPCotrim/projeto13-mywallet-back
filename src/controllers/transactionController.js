import db from '../databases/mongodb.js';
import dayjs from 'dayjs';
import { transactionSchema } from '../schemas/transactionSchemas.js';

export async function getTransactions(req, res) {
  // Obtain user
  const { user } = res.locals;
  try {
    // Fetch user transactions from Database
    const transactions = await db.collection('transactions').find({ userId: user._id }).toArray();
    return res
      .status(200)
      .send({ message: 'User transactions succesfully obtained', transactions });

    // Error when fetching user transactions
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'An error occured when fetching user transactions' });
  }
}

export async function registerTransaction(req, res) {
  // Obtain transaction
  const { type, description, value } = req.body;

  // Validate transaction
  const { error: validError } = transactionSchema.validate({ type, description, value });
  if (validError) {
    return res.status(422).send({ message: String(validError) });
  }

  // Obtain user
  const { user } = res.locals;

  try {
    // Insert transaction into Database
    await db.collection('transactions').insertOne({
      type,
      description,
      value,
      date: dayjs().format('DD/MM'),
      userId: user._id,
    });
    res.status(200).send({ message: 'Transaction succesfully created' });

    // Error when registering new transaction
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'An error occured when registering new transaction' });
  }
}
