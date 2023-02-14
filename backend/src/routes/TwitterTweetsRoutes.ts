import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import { IRequest } from './types/express/misc';
import TwitterTweetsService from '@src/services/TwitterTweetsService';
import { Response } from 'express';
import { RouteError } from '@src/other/classes';

const SERVER_ERROR_MESSAGE = "An error occured while processing request"

async function getAll(_: IRequest, res: Response) {
  try {
    const tweets = await TwitterTweetsService.getAll();
    console.log("tweets");
    console.log(tweets[0]);
    return res.status(HttpStatusCodes.OK).json(tweets);
  }catch(ex) {
    ex instanceof RouteError 
    ? res.status(ex.status).json(SERVER_ERROR_MESSAGE)
    : res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(SERVER_ERROR_MESSAGE)
  }
  
}

async function getDashboardData(_: IRequest, res: Response) {
  try {
    const data = await TwitterTweetsService.generateDashboardData();
    console.log(data);
    return res.status(HttpStatusCodes.OK).json(data);
  }catch(ex) {
    ex instanceof RouteError 
    ? res.status(ex.status).json(SERVER_ERROR_MESSAGE)
    : res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(SERVER_ERROR_MESSAGE)
  }
}

export default {
  getAll,
  getDashboardData
} as const;
