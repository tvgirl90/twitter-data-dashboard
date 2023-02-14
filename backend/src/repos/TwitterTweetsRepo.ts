import EnvVars from '@src/constants/EnvVars';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { AggregateFormat } from '@src/dtos/DashboardData';
import { ITwitterTweetModel } from '@src/models/TwitterTweetModel';
import { RouteError } from '@src/other/classes';
import { ascending, descending } from '@src/other/utils';
import TwitterDataDb from '@src/repos/TwitterDataDatabase';
import { Document } from 'mongodb';


async function getAll(): Promise<ITwitterTweetModel[]> {
  try {
    const client = TwitterDataDb.getClient();
    const collection = client.db(EnvVars.DatabaseName).collection<ITwitterTweetModel>(EnvVars.DatabaseCollectionName as string);
    return await (collection.find({}).toArray()) as ITwitterTweetModel[];
  } catch(ex) {
    console.log(ex)
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Error fetching data");
  };
}

const getCountsPerField = async (field: string) => {
  try {
    const COUNTS_PER_FIELDS_AGGREGATION_TEMPLATE = [
      {
        "$group": {
          "_id": '', 
          "value": {
            "$sum": 1
          }
        }
      }
    ]
    const client = TwitterDataDb.getClient();
    const collection = client.db(EnvVars.DatabaseName).collection<ITwitterTweetModel>(EnvVars.DatabaseCollectionName as string);
    
    let aggregation = [...COUNTS_PER_FIELDS_AGGREGATION_TEMPLATE]
    aggregation[0].$group._id =  '$' + field;
    
    return (await collection.aggregate(aggregation).toArray())
      .map((document: Document) => { 
        document['label'] = document._id;
        return document as AggregateFormat; 
      })
      .sort((a: AggregateFormat, b: AggregateFormat) => descending(a.value, b.value))
  } catch(ex) {
    console.log(ex)
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Error fetching data");
  }
}

interface ITotalsAggResult { totalLikes: number, totalRetweets: number, totalTweets: number }
const generateTotals = async () => {
  try {
    const aggregation = [
      {
        '$group': {
          '_id': null, 
          'totalLikes': {
            '$sum': '$likesReceived'
          }, 
          'totalRetweets': {
            '$sum': '$retweetsReceived'
          }, 
          'totalTweets': {
            '$sum': 1
          }
        }
      }
    ]
    const client = TwitterDataDb.getClient();
    const collection = client.db(EnvVars.DatabaseName).collection<ITwitterTweetModel>("tweets");

    return (await collection.aggregate(aggregation).toArray()) as ITotalsAggResult[]
  } catch(ex) {
    console.log(ex)
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Error fetching data");
  }
}

export default {
  getAll,
  getCountsPerField,
  generateTotals
} as const;
