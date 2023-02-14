import React from 'react';
import { CSSProperties } from 'react';
import KPIChart from './../components/charts/KPIChart';
import CustomBarChart from './../components/charts/BarChart';
import TableChart from './../components/charts/TableChart';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import axios from 'axios';
import ITwitterTweet from './../interfaces/TwitterTweet';
import GridLoader from "react-spinners/GridLoader";
import { IDashboardData } from './../interfaces/DashboardData';


const Dashboard: React.FunctionComponent = () => {
    const [tweets, setTweets] = React.useState<ITwitterTweet[] | undefined>(undefined);
    const [dashboardData, setDashboardData] = React.useState<IDashboardData | undefined>(undefined);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        async function getAllTweets() {
            axios
                .get<ITwitterTweet[]>(
                    "http://localhost:3000/api/tweets/all",
                    {
                        headers: {
                            "Content-Type": "application/json"
                        },
                    },
                )
                .then((response) => {
                    console.log(response.data);
                    setTweets(response.data);
                    setLoading(false);
                })
                .catch((ex) => {
                    let error = ex.response.status === 404
                        ? "Resource Not Found"
                        : ex.response.status === 500
                            ? "An error as occured while processing the request"
                            : "An unexpected error has occured";

                    setError(error);
                    setLoading(false);
                })
        }

        async function getDashboardData() {
            axios
                .get<IDashboardData>(
                    "http://localhost:3000/api/tweets/generate-aggregates",
                    {
                        headers: {
                            "Content-Type": "application/json"
                        },
                    },
                )
                .then((response) => {
                    console.log(response.data);
                    setDashboardData(response.data);
                    setLoading(false);
                })
                .catch((ex) => {
                    let error = ex.response.status === 404
                        ? "Resource Not Found"
                        : ex.response.status === 500
                            ? ex.response.message
                            : "An unexpected error has occured";

                    setError(error);
                    setLoading(false);
                })
        }

        getDashboardData();
        getAllTweets();

    }, []);

    const tweetLabels = [
        "Tweet Id", "Tweet URL", "Tweet Posted Time", "Tweet Content", "Sentiment", "Tweet Type", "Twitter Client",
        "Number of Retweets", "Number of Likes", "Country", "Tweet Language", "User Handle", "Is Verified User"
    ]

    const centerSingleElementStyle: CSSProperties = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    return (
        <React.Fragment>
            {error && !loading && <Typography style={centerSingleElementStyle} color="red" variant="h2">{error}</Typography>}
            {loading ?
                <GridLoader cssOverride={centerSingleElementStyle} color="white" size={50} />
                :
                <React.Fragment>
                    {dashboardData && tweets &&
                        <Container>
                            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                                <Typography variant="h3" textAlign="center" gutterBottom>Twitter Data Dashboard Based on Tweets About Black Lives Matter</Typography>
                                <Typography variant="h4" textAlign="center" gutterBottom>Data coming from trackmyhashtag</Typography>
                                <Grid container spacing={3} >
                                    <Grid item xs={12} md={4}>
                                        <KPIChart title='Total Tweets' value={dashboardData.totalTweets} />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <KPIChart title='Total Likes' value={dashboardData.totalLikes} />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <KPIChart title='Total Retweets' value={dashboardData.totalRetweets} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <CustomBarChart title='Counts of Tweets per Language' xAxisName='Language' yAxisName='Count' data={dashboardData.countsPerLanguageData} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <CustomBarChart title='Counts of Tweets per Country' xAxisName='Country' yAxisName='Count' data={dashboardData.countsPerLocationData} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <CustomBarChart title='Counts of Tweets per Tweet Type' xAxisName='Tweet Type' yAxisName='Count' data={dashboardData.countsPerTweetTypeData} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <CustomBarChart title='Counts of Tweets per Twitter Client' xAxisName='Twitter Client' yAxisName='Count' data={dashboardData.countsPerTwitterClientData} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TableChart title='List of all tweets inside dataset' data={tweets} labels={tweetLabels} />
                                    </Grid>
                                </Grid>
                            </Container>
                        </Container>
                    }
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default Dashboard;