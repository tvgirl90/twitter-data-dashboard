interface ITwitterTweetDTO {
    tweetId: string;
    tweetUrl: string;
    tweetPostedTime: Date;
    tweetContent: string;
    tweetType: string;
    client: string;
    retweetsReceived: number;
    likesReceived: number;
    tweetCountry: string;
    tweetLocation: string;
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

export default ITwitterTweetDTO;

