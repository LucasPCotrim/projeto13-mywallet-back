import db from '../database/mongodb.js';
import ObjectId from 'express';
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

export async function deleteTransaction(req, res) {
  // Obtain Transaction ID
  const transactionId = req.params.transactionId;
  console.log(transactionId);
  if (!transactionId) {
    res.status(422).send({ message: 'Error: Unable to delete transaction without id' });
  }

  // Obtain user
  const { user } = res.locals;

  try {
    // Check if transaction ID matches transaction from user
    const foundTransaction = await db
      .collection('transactions')
      .find({ _id: new ObjectId(transactionId), userId: user._id });
    if (!foundTransaction) {
      return res
        .status(404)
        .send({ message: 'No documents matched the query. Deleted 0 documents.' });
    }
    // Delete transaction
    const deletionResult = await db
      .collection('transactions')
      .deleteOne({ _id: new ObjectId(transactionId) });
    if (deletionResult.deletedCount === 1) {
      return res.status(200).send({ message: `Successfully deleted transaction ${transactionId}` });
    } else {
      return res
        .status(404)
        .send({ message: 'No documents matched the query. Deleted 0 documents.' });
    }
    // Error when deleting transaction
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'An error occured when deleting transaction' });
  }
}
