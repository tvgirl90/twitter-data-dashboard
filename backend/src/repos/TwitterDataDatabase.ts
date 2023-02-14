import { MongoClient } from "mongodb";
import EnvVars from '../constants/EnvVars';
import logger from 'jet-logger';

const uri = `mongodb+srv://${EnvVars.DatabaseUsername}:${EnvVars.DatabasePassword}@${EnvVars.DatabaseCluster}/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

const init = async () => {
  try {
    await client.connect();
    logger.info("Connected to database")
  } catch (error) {
    logger.err("Not able to connect to database")
    console.log(error);
  }
};

const getClient = () => {
  return client;
};

export default {
    init,
    getClient
} as const;