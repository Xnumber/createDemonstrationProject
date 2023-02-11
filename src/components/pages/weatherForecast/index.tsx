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
import { elements, locations, labels, deratives } from "./const";
import { getOptions } from "src/lib/option";
import { useGetWeatherForcastQuery } from "service/weather/get";
import { getChartDatasetFromWeatherRawData } from "./lib";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

function WeatherForecast() {
	const { t } = useTranslation("weather-forecast");
	const [compare, setCompare] = useState<Compare>("location");
	const [locationChosen, setLocationChosen] = useState<string[]>([]);
	const [elementChosen, setElementChosen] = useState<string[]>([]);
	const [labelChosen, setLabelChosen] = useState<string[]>([]);
	const [derativeChosen, setDerativesChosen] = useState<string[]>([]);
	const chartRef = useRef<ChartJS<"line", { x: string; y: number }[]>>(null);
	const chartTitle = "Title";
	const locationOPtions = useMemo(() => getOptions(locations, t), []);
	const elementOPtions = useMemo(() => getOptions(elements, t), []);
	const labelOptions = useMemo(() => getOptions(labels, t), []);
	const derativeOptions = useMemo(() => getOptions(deratives, t), []);
	const { data: rawData } = useGetWeatherForcastQuery({ locations: locationChosen, elements: elementChosen});

	const handleSetCompare: React.ReactEventHandler<HTMLInputElement> = useCallback((e) => {
		setCompare(e.currentTarget.value as Compare);
	}, []);

	const handleSetlocationChosen = useCallback((e: string[]) => {
		setLocationChosen(e);
	}, []);

	const handleSetElementChosen = useCallback((e: string[]) => {
		setElementChosen(e);
	}, []);
	
	const handleSetLabelChosen = useCallback((e: string[]) => {
		setLabelChosen(e);
	}, []);
	
	const handleSetDerativesChosen = useCallback((e: string[]) => {
		setDerativesChosen(e);
	}, []);

	const chartDataset = getChartDatasetFromWeatherRawData(rawData, compare);

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
					options={labelOptions}
					value={labelChosen}
					callback={handleSetLabelChosen}
				/>
			</Grid2>
			<Grid2 xs={12} md={3}>
				<MultipleSelect 
					label={t("derivatives")}
					value={derativeChosen}
					options={derativeOptions}
					callback={handleSetDerativesChosen}
				/>
			</Grid2>
		</Grid2>
		<Grid2 container>
			<Grid2 xs={12}>
				<Typography variant="h2">
					{chartTitle}
				</Typography>
				<ChartHtmlLegend chart={chartRef.current}/>
				<Chart
					type="line"
					ref={chartRef}
					data={{ datasets: chartDataset }}
				/>;
			</Grid2>
		</Grid2>
	</>;
}

export default WeatherForecast;