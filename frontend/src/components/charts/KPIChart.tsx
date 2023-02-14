import React from "react";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Title from "../common/Title";


interface KPIChartProps {
    title: string;
    value: string | number;
    subtitle?: string;
}

const KPIChart: React.FunctionComponent<KPIChartProps> = ({ title, value, subtitle }) => (
    <React.Fragment>
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center"
                // height: 240,
            }}
        >
            <Title>{title}</Title>
            <Typography component="p" variant="h4">
                {value}
            </Typography>
            {subtitle && 
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {subtitle}
            </Typography>
            }
        </Paper>
    </React.Fragment>
)

export default KPIChart;