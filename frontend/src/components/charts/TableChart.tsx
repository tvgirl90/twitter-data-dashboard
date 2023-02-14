import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Title from "../common/Title";
import ITwitterTweet from "../../interfaces/TwitterTweet";
import Typography from '@mui/material/Typography';


interface TableChartProps {
  title: string;
  data: ITwitterTweet[];
  labels: string[];
}

const TableChart: React.FunctionComponent<TableChartProps> = ({ title, data, labels }) => (
  <React.Fragment>
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        width:"100%",
        height: 400,
        overflowY: "scroll"
      }}
    >
      <Title>{title}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            {labels.map((label) => (
              <TableCell key={label}><Typography variant="subtitle1">{label}</Typography></TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.tweetId}>
              <TableCell>{row.tweetId}</TableCell>
              <TableCell>{row.tweetUrl}</TableCell>
              <TableCell>{row.tweetPostedTime.toString()}</TableCell>
              <TableCell>{row.tweetContent}</TableCell>
              <TableCell>{row.sentiment}</TableCell>
              <TableCell>{row.tweetType}</TableCell>
              <TableCell>{row.client}</TableCell>
              <TableCell>{row.retweetsReceived}</TableCell>
              <TableCell>{row.likesReceived}</TableCell>
              <TableCell>{row.tweetCountry}</TableCell>
              <TableCell>{row.tweetLanguage}</TableCell>
              <TableCell>{row.userName}</TableCell>
              <TableCell>{row.isVerified ? "Verified" : "Non-Verified"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </React.Fragment>
)

export default TableChart;