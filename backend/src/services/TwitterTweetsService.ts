import TwitterTweetsRepo from '@src/repos/TwitterTweetsRepo';
import { ITwitterTweetModel } from '@src/models/TwitterTweetModel';
import * as dfd from "danfojs-node"
import { ArrayType2D } from 'danfojs-node/dist/danfojs-base/shared/types';
import { AggregateFormat, DashboardDataDTO } from '@src/dtos/DashboardData'
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { RouteError } from '@src/other/classes';
import ITwitterTweetDTO from '@src/dtos/TwitterTweetDTO';
import { ascending, descending } from '@src/other/utils';
const countryParser = require('country-in-text-detector'); //was not able to do import * as
const countryList = require("iso-3166-country-list"); //was not able to do import * as


interface CountryDetection {
  iso3166: string;
  name: string;
  type: string;
  matches: string[]
}

const getAll = async () => {
  try {
    const data: ITwitterTweetModel[] = await TwitterTweetsRepo.getAll();

    return data.map(twitterTweetModel => toTwitterTweet(twitterTweetModel));

  } catch(e) {
    console.log(e)
    throw new RouteError(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Error fetching data");
  }
}

const generateDashboardData = async () => {
  let countsPerLanguage = await TwitterTweetsRepo.getCountsPerField("tweetLanguage")
  let countsPerTwitterClient = await TwitterTweetsRepo.getCountsPerField("client")
  let countsPerTweetType = await TwitterTweetsRepo.getCountsPerField("tweetType")
  let countsPerVerifiedStatus = await TwitterTweetsRepo.getCountsPerField("verifiedOrNot")
  let countsPerSentiment = await TwitterTweetsRepo.getCountsPerField("sentiment")
  let countsPerLocation = await generateCountsPerLocation()
  let totals = await TwitterTweetsRepo.generateTotals()

  return {
    totalTweets: totals[0].totalTweets,
    totalLikes: totals[0].totalLikes,
    totalRetweets: totals[0].totalRetweets,
    countsPerLanguageData: countsPerLanguage,
    countsPerTwitterClientData: countsPerTwitterClient,
    countsPerTweetTypeData: countsPerTweetType,
    countsPerVerifiedStatusData: countsPerVerifiedStatus,
    countsPerLocationData: countsPerLocation,
    countsPerSentimentData: countsPerSentiment,
    top5PositiveTweets: [],
    top5NegativeTweets: [], 
  } as DashboardDataDTO
}

const generateCountsPerLocation = async () => {
  const data: ITwitterTweetModel[] = await TwitterTweetsRepo.getAll();
  const parsedData = data.map(twitterTweetModel => toTwitterTweet(twitterTweetModel));
  let df = new dfd.DataFrame(parsedData);
  let operationResult = df.groupby(["tweetCountry"]).count().getColumnData as ArrayType2D
  const countries = operationResult[0];
  const values = operationResult[1];

  return countries
      .map((country, index) => { return {label: country, value: values[index]} as AggregateFormat })
      .sort((a: AggregateFormat, b: AggregateFormat) => descending(a.value, b.value))
}

const toTwitterTweet = (tweetModel: ITwitterTweetModel) => {
  const REGEX_EXPRESSION_DOUBLE_COLON = /"/g;
  const REPLACE_CHARACTER = '';

  return {
    tweetId: tweetModel.tweetId.replace(REGEX_EXPRESSION_DOUBLE_COLON, REPLACE_CHARACTER),
    tweetUrl: tweetModel.tweetURL,
    tweetPostedTime: new Date(tweetModel.tweetPostedTime),
    tweetContent: tweetModel.tweetContent.replace(REGEX_EXPRESSION_DOUBLE_COLON, REPLACE_CHARACTER),
    tweetType: tweetModel.tweetType,
    client: tweetModel.client.replace(REGEX_EXPRESSION_DOUBLE_COLON, REPLACE_CHARACTER),
    retweetsReceived: tweetModel.retweetsReceived,
    likesReceived: tweetModel.likesReceived,
    tweetCountry: getCountryFromLocation('' + tweetModel.tweetLocation),
    tweetLocation: tweetModel.tweetLocation,
    tweetLanguage: tweetModel.tweetLanguage,
    userId: tweetModel.userId.replace(REGEX_EXPRESSION_DOUBLE_COLON, REPLACE_CHARACTER),
    userFullName: tweetModel.displayName,
    userName: tweetModel.userName,
    userBio: tweetModel.userBio.replace(REGEX_EXPRESSION_DOUBLE_COLON, REPLACE_CHARACTER),
    isVerified: tweetModel.verifiedOrNot === "Verified",
    profileUrl: tweetModel.profileURL,
    userFollowers: tweetModel.userFollowers,
    userFollowing: tweetModel.userFollowing,
    userAccountCreatedAt: new Date(tweetModel.userAccountCreationDate),
    sentiment: tweetModel.sentiment === 0 ? "Negative" : "Positive"
  } as ITwitterTweetDTO
}

const getCountryFromLocation = (location: string) => {
  if (location === undefined || location === "") return "Unknown Country"

  let countryDetected: CountryDetection[] = countryParser.detect(location);
  if (countryDetected.length === 0) return "Unknown Country"

  let locationSplit = countryDetected[0].iso3166.split("-");

  return countryList.name(locationSplit[0]) as string;
}

export default {
  getAll,
  generateDashboardData
} as const;
