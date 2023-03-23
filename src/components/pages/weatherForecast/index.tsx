import React, { useRef, useState, useCallback, useMemo, useEffect } from "react";
import { MultipleSelect } from "molecules/multipleSelect";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import  Grid2  from "@mui/material/Unstable_Grid2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ChartType } from "chart.js";
import { Chart } from "react-chartjs-2";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Box } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import { Compare, ElementChartDatasetColors, LocationChartDatasetColors, WeatherChartTData, WeatherDerivative, WeatherTag } from "./typing";
import { elements, locations, labels, deratives } from "./const";
import { getOptions } from "src/lib/option";
import { useGetWeatherForcastQuery } from "service/weather/get";
import { getChartDatasetFromWeatherRawData, getDerivedDatasets } from "./lib";
import { SingleSelect } from "molecules/singleSelect";
import { getStyledDatasets, useElementColor, useLocationColor } from "./lib/style";
import { WeatherChartLegend } from "features/chart/weatherLegend";
import { chartLegendPlugin } from "./plugin/legend";
import { getTopLayerSpecifiedDataset } from "./lib/layerOrder";
import { useAppSelector } from "src/app/hooks";
import { XCenter } from "templates/xCenter";
import { CreateButton, DeleteButton } from "atoms/button";
import { YCenter } from "templates/yCenter";
import { FlexBox } from "templates/flexBox";
import { getRandomColor } from "src/lib/color";
import { getDifferencesDatasetLabel, getDerativeLabel } from "./lib/deratives";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

function WeatherForecast() {
	const { i18n, t, ready } = useTranslation("weather-forecast");
	
	const [compare, setCompare] = useState<Compare>("location");
	const [locationChosen, setLocationChosen] = useState<string[]>(["臺北市"]);
	const [elementChosen, setElementChosen] = useState<string[]>(["MaxT"]);
	const [labelChosen, setLabelChosen] = useState<WeatherTag[]>([]);
	const [derativeChosen, setDerativesChosen] = useState<WeatherDerivative[]>([]);
	const [differencePairs, setDifferencePairs] = useState<string[][]>([]);
	const chartRef = useRef<ChartJS<ChartType, WeatherChartTData> | undefined>();
	const mode = useAppSelector(store => store.theme.mode);
	const { data: rawData } = useGetWeatherForcastQuery({ locations: locationChosen, elements: elementChosen});

	const locationOPtions = useMemo(() => getOptions(locations, t), [ready]);
	const elementOPtions = useMemo(() => getOptions(elements, t), [ready]);
	const labelOptions = useMemo(() => getOptions(labels, t), [ready, i18n.language]);
	const derativeOptions = useMemo(() => getOptions(deratives, t), [ready, i18n.language]);
	const differencePairOptions = useMemo(() => {
		if (compare === "location") {
			return getOptions(locationChosen, t);
		} else {
			return getOptions(elementChosen, t);
		}
	}, [compare, elementChosen.length, locationChosen.length]);
	const topLayerDatasetIndex = useAppSelector(state => state.weatherLegend.topLayerDatasetIndex);
	const chartTitle = compare === "element" ? locationChosen[0]: elementChosen[0];

	const handleSetCompare: React.ReactEventHandler<HTMLInputElement> = useCallback((e) => {
		setCompare(e.currentTarget.value as Compare);
		setLocationChosen(["臺北市"]);
		setElementChosen(["MaxT"]);
	}, []);

	const handleSetLocationChosen = useCallback((e: string[]|string) => {
		if(typeof e === "string") {
			setLocationChosen([e]);
		} else {
			setLocationChosen(e);
		}
	}, []);

	const handleSetDifferencePairs = useCallback((index: number, pairIndex: number, value: string) => {
		setDifferencePairs(differencePairs => differencePairs.map((o, i) => {
			if (i === index) {
				const pair = [...o];
				pair[pairIndex] = value;
				return pair;
			} else {
				return o;
			}
		}));
	}, []);

	const handleCreateDifferencePairs = useCallback(() => {
		setDifferencePairs(differencePairs => [...differencePairs, ["", ""]]);
	}, []);

	const handleDeleteDifferencePairs = useCallback((index: number) => {
		setDifferencePairs(differencePairs => differencePairs.filter((_o, i) => i !== index));
	}, []);

	const handleSetElementChosen = useCallback((e: string[] | string) => {
		if(typeof e === "string") {
			setElementChosen([e]);
		} else {
			setElementChosen(e);
		}
	}, []);
	
	const handleSetLabelChosen = useCallback((e: WeatherTag[]) => {
		setLabelChosen(e);
	}, []);
	
	const handleSetDerativesChosen = useCallback((e: WeatherDerivative) => {
		setDerativesChosen([e]);
	}, []);
	
	const [elementColors, setElementColors] = useElementColor();
	const [locationColors, setLocationColors] = useLocationColor();

	const chartDataset = useMemo(() =>getChartDatasetFromWeatherRawData(rawData, compare), [rawData, compare]);
	const withDerivedDatasets = useMemo(()=>getDerivedDatasets(chartDataset, derativeChosen, differencePairs), [chartDataset, derativeChosen, differencePairs]);
	const styledChartDatasets = useMemo(() =>getStyledDatasets(withDerivedDatasets, labelChosen, compare === "element" ? elementColors: locationColors), [withDerivedDatasets, labelChosen, compare, elementColors, locationColors]);
	const topLayerSpecifiedDatasets = useMemo(() => getTopLayerSpecifiedDataset(styledChartDatasets, topLayerDatasetIndex), [styledChartDatasets, topLayerDatasetIndex]);
	
	useEffect(() => {
		
		if (differencePairs.length === 0) {
			return;
		}

		const label = getDifferencesDatasetLabel(differencePairs[differencePairs.length - 1]);
		if (compare === "location" && locationColors[label]) {
			return;
		}
		
		if (compare === "element" && elementColors[label]) {
			return;
		}
		
		if (compare === "element") {
			setElementColors({
				...elementColors,
				[label]: {
					backgroundColor: getRandomColor()
				}
			});
		} else {
			setLocationColors({
				...locationColors,
				[label]: {
					backgroundColor: getRandomColor()
				}
			});
		}
	}, [differencePairs]);

	useEffect(() => {
		
		if (derativeChosen.length === 0) {
			return;
		}
		let colors: ElementChartDatasetColors | LocationChartDatasetColors;

		if (compare === "element") {
			colors = elementColors;
		} else {
			colors = locationColors;
		}

		for (let index = 0; index < chartDataset.length; index++) {
			const label = getDerativeLabel(chartDataset[index].label, derativeChosen[0]);
			if (label && colors[label]) {
				continue;
			} else if(label){
				colors = {
					...colors,
					[label]: {
						backgroundColor: getRandomColor()
					}
				};
			}
		}

		if (compare === "element") {
			setElementColors(colors);
		} else {
			setLocationColors(colors);
		}

	}, [derativeChosen]);

	return <>
		<Typography variant="h1">
			{t("weather-forecast")}
		</Typography>
		<Grid2 container columns={12}>
			<Grid2 xs={12}>
				<Typography variant="h3">
					{t("compare")}
				</Typography>
				<FormControl>
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
			<Grid2 xs={12}>
				<FormLabel id="compare">
					<Typography variant="h3">
						{t("condition")}
					</Typography>
				</FormLabel>
			</Grid2>
		</Grid2>
		<Grid2 container columns={12}>
			<Grid2 xs={12} md={3}>
				{
					compare === "location" ?
						<MultipleSelect
							label={t("location-multiple")}
							defaultSelected={locationChosen}
							options={locationOPtions}
							callback={handleSetLocationChosen}
						/>: <SingleSelect
							label={t("location")}
							defaultSelected={locationChosen[0]}
							options={locationOPtions}
							callback={handleSetLocationChosen}
						/>
				}
			</Grid2>
			<Grid2 xs={12} md={3}>
				{
					compare === "element" ?
						<MultipleSelect
							label={t("element-multiple")}
							options={elementOPtions}
							defaultSelected={elementChosen}
							callback={handleSetElementChosen}
						/>: <SingleSelect 
							label={t("element")}
							options={elementOPtions}
							defaultSelected={elementChosen[0]}
							callback={handleSetElementChosen}
						/>
				}
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
				<SingleSelect
					label={t("derivatives")}
					value={derativeChosen}
					options={derativeOptions}
					callback={handleSetDerativesChosen}
				/>
				{
					derativeChosen.includes("difference") ? 
						<Box mt={2}>
							<div>
								{
									differencePairs.map((o, i) => {
										return <FlexBox mb={2} key={i}>
											<SingleSelect defaultSelected={o[0]} options={differencePairOptions} callback={(value:string) => {handleSetDifferencePairs(i, 0, value);}}/>
											<div>-</div>
											<SingleSelect defaultSelected={o[1]} options={differencePairOptions} callback={(value:string) => {handleSetDifferencePairs(i, 1, value);}}/>
											<YCenter>
												<DeleteButton onClick={() => handleDeleteDifferencePairs(i)}/>
											</YCenter>
										</FlexBox>;
									})
								}
								<div>
									<CreateButton onClick={handleCreateDifferencePairs}/>
								</div>
							</div>
						</Box>: null
				}
			</Grid2>
		</Grid2>
		<Grid2 container>
			<Grid2 xs={12}>
				<XCenter>
					<Typography variant="h2">
						{chartTitle}
					</Typography>
				</XCenter>
				<WeatherChartLegend chart={chartRef.current} />
				<Chart
					type="line"
					ref={chartRef}
					data={{ datasets: topLayerSpecifiedDatasets }}
					options={{
						scales: {
							y: {
								labels: ["1"],
								offset: true,
								title: {
									display: true,
									text: "°C",
									color: mode === "light" ? "#1b1b1f": "#e3e2e6",
									font: {
										size: 32
									},
								},
								ticks: {
									color: mode === "light" ? "#1b1b1f": "#e3e2e6",
								},
								grid: {
									display: false,
								}
							},
							x: {
								alignToPixels: true,
								offset: true,
								ticks: {
									color: mode === "light" ? "#1b1b1f": "#e3e2e6",
									callback(this, _tickValue, index) {
										const textArray = this.getLabelForValue(index).split("-");
										textArray.shift();
										return textArray.join("/");
									},
								},
								title: {
									display: true,
									text: t("time"),
									color: mode === "light" ? "#1b1b1f": "#e3e2e6",
									font: {
										size: 32,
										family: "sans-serif, 'Noto Sans TC'",
									},
								},
								grid: {
									display: false,
								}
							},
						},
						plugins: {
							legend: {
								display: false
							},
						}
					}}
					plugins={[
						chartLegendPlugin
					]}
				/>
			</Grid2>
		</Grid2>
	</>;
}

export default WeatherForecast;