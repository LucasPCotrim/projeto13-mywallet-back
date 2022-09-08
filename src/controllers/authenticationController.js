import db from '../databases/mongodb.js';
import joi from 'joi';
import bcrypt from 'bcrypt';

export async function userSignUp(req, res) {
  const authSignUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref('password'),
  });
  try {
    const user = req.body;

    const { error: validError } = authSignUpSchema.validate(user);
    console.log(validError);
    if (validError) return res.status(422).send(String(validError));

    const passwordHash = bcrypt.hashSync(user.password, 10);

    await db
      .collection('users')
      .insertOne({ name: user.name, email: user.email, password: passwordHash });
    res.status(200).send('Succesful sign-up');
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occured during user sign-up!');
  }
}
