import React from "react";
import Paper from '@mui/material/Paper';
import Title from "../common/Title";
import { IAggregateFormat } from "../../interfaces/DashboardData";
import { ResponsiveContainer, BarChart, Bar, YAxis, CartesianGrid, XAxis, LabelList, Label } from "recharts";


interface BarChartProps {
    title: string;
    xAxisName: string;
    yAxisName: string;
    data: IAggregateFormat[];
}

const possibleBarColors = ["#82ca9d", "#8884d8"]

const CustomBarChart: React.FunctionComponent<BarChartProps> = ({ title, xAxisName, yAxisName, data }) => {
    const [barColor, setBarColor] = React.useState(
        possibleBarColors[Math.floor(Math.random() * possibleBarColors.length)]
    )

    return (<React.Fragment>
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center",
                width: "100%",
                height: "300px",
                overflow: "auto"
            }}
        >
            <Title>{title}</Title>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid stroke="#e0dfdf" opacity={0.3} strokeDasharray="5 5" />
                    <XAxis dataKey="label">
                        <Label value={xAxisName} offset={-5} position="insideBottom" fontSize={12} />
                    </XAxis>
                    <YAxis>
                        <Label value={yAxisName} angle={-90} position='insideLeft' fontSize={12} />
                    </YAxis>
                    <Bar dataKey="value" fill={barColor}>
                        <LabelList dataKey="value" position="center" fill="white" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

        </Paper>
    </React.Fragment>
    )
}

export default CustomBarChart;