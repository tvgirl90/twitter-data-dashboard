import { Router } from 'express';
import Paths from './constants/Paths';
import TwitterTweetsRoutes from './TwitterTweetsRoutes';


const apiRouter = Router();

const twitterDataRouter = Router();

twitterDataRouter.get(
  Paths.TwitterTweets.Get,
  TwitterTweetsRoutes.getAll,
);

twitterDataRouter.get(
  Paths.TwitterTweets.GenerateDashboardData,
  TwitterTweetsRoutes.getDashboardData
)

apiRouter.use(Paths.TwitterTweets.Base, twitterDataRouter);

export default apiRouter;
