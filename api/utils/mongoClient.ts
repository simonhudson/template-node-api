import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const uri = process.env.DB_URI;
if (!uri) throw new Error('No DB_URI in .env file');

let mongoClient: MongoClient;
try {
	mongoClient = new MongoClient(uri);
	mongoClient.connect();
} catch (error) {
	throw Error(`Connection to MongoDB Atlas failed: ${error}`);
}

export default mongoClient;
