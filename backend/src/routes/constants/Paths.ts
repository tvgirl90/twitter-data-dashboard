import { Immutable } from '@src/other/types';


const Paths = {
  Base: '/api',
  TwitterTweets: {
    Base: '/tweets',
    Get: '/all',
    GenerateDashboardData: '/generate-aggregates'
  }
};


export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
