import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let db = null;

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
  db = mongoClient.db(process.env.MONGO_DATABASE_NAME);
  console.log('Database connected successfully!');
} catch (error) {
  console.error('Error when connecting to Database...');
}

export default db;
