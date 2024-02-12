/* eslint-disable no-console */
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const uri = process.env.DB_URI;
if (!uri) throw new Error('No DB_URI in .env file');

let mongoClient: MongoClient;
try {
	mongoClient = new MongoClient(uri);
	console.log('Connecting to MongoDB Atlas cluster...');
	mongoClient.connect();
	console.log('Successfully connected to MongoDB Atlas!');
} catch (error) {
	console.error('Connection to MongoDB Atlas failed!', error);
	process.exit();
}

export default mongoClient;
