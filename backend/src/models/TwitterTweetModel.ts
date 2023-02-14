import { ObjectId } from "mongodb";


export interface ITwitterTweetModel {
  _id: ObjectId;
  tweetId: string;
  tweetURL: string;
  tweetPostedTime: string;
  tweetContent: string;
  tweetType: string;
  client: string;
  retweetsReceived: number;
  likesReceived: number;
  tweetLocation: string;
  tweetLanguage: string;
  userId: string;
  displayName: string;
  userName: string;
  userBio: string;
  verifiedOrNot: string;
  profileURL: string;
  userFollowers: number;
  userFollowing: number;
  userAccountCreationDate: string;
  sentiment: number;
}

