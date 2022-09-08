import db from '../databases/mongodb.js';
import { authSignUpSchema } from '../schemas/authenticationSchemas.js';
import bcrypt from 'bcrypt';

export async function userSignUp(req, res) {
  try {
    const user = req.body;

    const { error: validError } = authSignUpSchema.validate(user);
    if (validError) {
      return res.status(422).send({ message: String(validError) });
    }

    const checkExistingEmail = await db.collection('users').findOne({ email: user.email });
    if (checkExistingEmail) {
      return res.status(409).send({ message: 'Error: Invalid email address!' });
    }

    const passwordHash = bcrypt.hashSync(user.password, 10);

    await db
      .collection('users')
      .insertOne({ name: user.name, email: user.email, password: passwordHash });
    return res.status(200).send({ message: 'Succesful sign-up' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'An error occured during user sign-up!' });
  }
}
