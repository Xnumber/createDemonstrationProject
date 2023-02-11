import React, { useRef, useState, useCallback, useMemo } from "react";
import { MultipleSelect } from "molecules/multipleSelect";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import  Grid2  from "@mui/material/Unstable_Grid2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { ChartHtmlLegend } from "molecules/chart/lengend";
import { Chart } from "react-chartjs-2";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Compare } from "./typing";
import { elements, locations } from "./const";
import { getOptions } from "src/lib/option";

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
	const [compare, setCompare] = useState<Compare>();
	const [locationChosen, setLocationChosen] = useState<string[]>([]);
	const [elementChosen, setElementChosen] = useState<string[]>([]);
	const chartRef = useRef<ChartJS>(null);
	const chartTitle = "Title";
	const locationOPtions = useMemo(() => getOptions(locations, t), []);
	const elementOPtions = useMemo(() => getOptions(elements, t), []);
	
	const handleSetCompare: React.ReactEventHandler<HTMLInputElement> = useCallback((e) => {
		setCompare(e.currentTarget.value as Compare);
	}, []);

	const handleSetlocationChosen = useCallback((e: string[]) => {
		setLocationChosen(e);
	}, []);

	const handleSetElementChosen = useCallback((e: string[]) => {
		setElementChosen(e);
	}, []);

	return <>
		<Typography variant="h1">
			{t("weather-forecast")}
		</Typography>
		<Grid2 container columns={12}>
			<Grid2 xs={12}>
				<FormControl>
					<FormLabel id="compare">
						{t("compare")}
					</FormLabel>
					<RadioGroup
						row
						aria-labelledby="compare"
						name="compare-group"
						value={compare}
						onChange={handleSetCompare}
					>
						<FormControlLabel value="location" control={<Radio />} label={t("location")} />
						<FormControlLabel value="element" control={<Radio />} label={t("element")} />
					</RadioGroup>
				</FormControl>
			</Grid2>
		</Grid2>
		<Grid2 container columns={12}>
			<Grid2 xs={12} md={3}>
				<MultipleSelect 
					label={t("location")}
					value={locationChosen}
					options={locationOPtions}
					callback={handleSetlocationChosen}
				/>
			</Grid2>
			<Grid2 xs={12} md={3}>
				<MultipleSelect 
					label={t("element")}
					options={elementOPtions}
					value={elementChosen}
					callback={handleSetElementChosen}
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