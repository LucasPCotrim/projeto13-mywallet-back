import db from '../databases/mongodb.js';

export async function getTransactions(req, res) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).send({ message: 'Error: Invalid authentication token!' });

    const session = await db.collection('sessions').findOne({ token });
    if (!session) {
      return res.status(401).send({ message: 'Error: Session timeout! Please log in again' });
    }

    const user = await db.collection('users').findOne({ _id: session.userId });
    if (!user) {
      return res.status(404).send({ message: 'Error: User not found!' });
    }

    const transactions = await db.collection('transactions').find({ userId: user._id }).toArray();
    return res
      .status(200)
      .send({ message: 'User transactions succesfully obtained!', transactions });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'An error occured when fetching user transactions' });
  }
}
