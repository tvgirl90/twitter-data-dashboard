interface BaseAggregate {_id?: string, value: number}

export interface IAggregateFormat extends BaseAggregate { label: string }

export interface IDashboardData {
    totalTweets: number,
    totalLikes: number,
    totalRetweets: number,
    countsPerLanguageData: IAggregateFormat[],
    countsPerTwitterClientData: IAggregateFormat[],
    countsPerTweetTypeData: IAggregateFormat[],
    countsPerVerifiedStatusData: IAggregateFormat[],
    countsPerLocationData: IAggregateFormat[]
}