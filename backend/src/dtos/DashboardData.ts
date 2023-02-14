import ITwitterTweetDTO from "./TwitterTweetDTO";

interface BaseAggregate {_id?: string, value: number}

export interface AggregateFormat extends BaseAggregate { label: string }

export interface DashboardDataDTO {
    totalTweets: number,
    totalLikes: number,
    totalRetweets: number,
    countsPerLanguageData: AggregateFormat[],
    countsPerTwitterClientData: AggregateFormat[],
    countsPerTweetTypeData: AggregateFormat[],
    countsPerVerifiedStatusData: AggregateFormat[],
    countsPerLocationData: AggregateFormat[],
    countsPerSentimentData: AggregateFormat[],
    top5PositiveTweets: ITwitterTweetDTO[],
    top5NegativeTweets: ITwitterTweetDTO[],
}