
interface ITwitterTweet {
    tweetId: string;
    tweetUrl: string;
    tweetPostedTime: Date;
    tweetContent: string;
    tweetType: string;
    client: string;
    retweetsReceived: number;
    likesReceived: number;
    tweetLocation: string;
    tweetCountry: string;
    tweetLanguage: string;
    userId: string;
    userFullName: string;
    userName: string;
    userBio: string;
    isVerified: boolean;
    profileUrl: string;
    userFollowers: number;
    userFollowing: number;
    userAccountCreatedAt: Date;
    sentiment: string;
  }


export default ITwitterTweet;