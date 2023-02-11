import React, { useRef } from "react";
import { MultipleSelect } from "molecules/multipleSelect";
import { useTranslation } from "react-i18next";
import { Typography, Checkbox, FormControlLabel } from "@mui/material";
import  Grid2  from "@mui/material/Unstable_Grid2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { ChartHtmlLegend } from "molecules/chart/lengend";
import { Chart } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "Chart.js Line Chart",
		},
	},
};
const labels = [1, 2, 3];
const data = {
	labels,
	datasets: [
		{
			label: "1",
			data: [1, 2, 3],
			borderColor: "aqua",
			backgroundColor: "blue",
		},
		{
			label: "2",
			data: [12, 22, 32],
			borderColor: "red",
			backgroundColor: "pink",
		},
	],
};

function WeatherForecast() {
	const { t } = useTranslation("weather-forecast");
	const chartRef = useRef<ChartJS>(null);
	
	const chartTitle = "Title";

	return <>
		<Typography variant="h1">
			{t("weather-forecast")}
		</Typography>
		<Grid2 container columns={12}>
			<Grid2 md={3} xs={12}>
				<FormControlLabel
					label={t("by-location")}
					control={ <Checkbox />}
				/>
			</Grid2>
			<Grid2 md={3} xs={12}>
				<FormControlLabel
					label={t("by-element")}
					control={ <Checkbox />}
				/>
			</Grid2>
		</Grid2>

		<Grid2 container columns={12}>
			<Grid2 xs={12} md={3}>
				<MultipleSelect 
					label={t("location")}
					options={[]}
					callback={(e) => {console.log(e);}}
				/>

			</Grid2>
			<Grid2 xs={12} md={3}>
				<MultipleSelect 
					label={t("element")}
					options={[]}
					callback={(e) => {console.log(e);}}
				/>

			</Grid2>
			<Grid2 xs={12} md={3}>
				<MultipleSelect 
					label={t("label")}
					options={[]}
					callback={(e) => {console.log(e);}}
				/>

			</Grid2>
			<Grid2 xs={12} md={3}>
				<MultipleSelect 
					label={t("derivatives")}
					options={[]}
					callback={(e) => {console.log(e);}}
				/>
			</Grid2>
		</Grid2>
		<Grid2 container>
			<Grid2 xs={12}>
				<Typography variant="h2">
					{chartTitle}
				</Typography>
				<ChartHtmlLegend chart={chartRef.current}/>
				<Chart type="line" ref={chartRef} options={options} data={data} />;
			</Grid2>
		</Grid2>
	</>;
}
export default WeatherForecast;