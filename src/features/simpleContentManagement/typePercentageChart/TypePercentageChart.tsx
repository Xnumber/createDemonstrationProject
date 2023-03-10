import React, { ReactNode, useCallback, useRef, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ChartType, BarElement, RadialLinearScale, ArcElement } from "chart.js";
import { Chart } from "react-chartjs-2";
import { useAppSelector } from "src/app/hooks";
import { useTranslation } from "react-i18next";
import { Box, Button } from "@mui/material";
import { XBetween } from "templates/xBetween";
import { FlexBox } from "templates/flexBox";
import { getTypePercentageTableData } from "../typePercentageTable/utils";
import { getPercentageChartData } from "./util";
import { useGetSimpleContentQueryState } from "service/simpleContentManagement/get";

ChartJS.register(
	ArcElement,
	BarElement,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	RadialLinearScale,
	Title,
	Tooltip,
	Legend,
	Filler,
);

const BoxWithPadding = (props: { children: ReactNode }) => <Box px={1}>
	{props.children}
</Box>;

export function TypePercentageChart() {
	const chartRef = useRef<ChartJS<ChartType, number[]>>();
	const mode = useAppSelector(store => store.theme.mode);
	const [chartType, setChartType] = useState<"line" | "bar" | "polarArea">("line");
	const [dataType, setDataType] = useState<"costPercentage" | "quantityPercentage">("costPercentage");
	// const [shownDataColumn, setShownDataColumn] = useState<"cost" | "quantity">("cost");
	// line bar dognut
	const condition = useAppSelector(state => state.listCondition);
	const { data } = useGetSimpleContentQueryState({ type: condition.type, searchString: condition.searchString });
	const { t } = useTranslation("simple-content-management");
	// alert("123");
	const handleSetChartType = useCallback((type: "line" | "bar" | "polarArea") => {
		setChartType(type);
	}, []);

	const typePercentageTableData = data ? getTypePercentageTableData(data.data): [];
	
	const chartData = getPercentageChartData(typePercentageTableData, dataType);
	const handleDataType = useCallback((type: "costPercentage" | "quantityPercentage") => {
		setDataType(type);
	}, []);
	// shownDataColumn;
	console.log(chartData);
	return <Box height={600}>
		<XBetween height={"100px"}>
			<FlexBox margin={"0 -0.5rem"}>
				<BoxWithPadding>
					<Button color="primary" onClick={() => {handleDataType("costPercentage");}} variant="contained">
						{t("cost")}
					</Button>
				</BoxWithPadding>
				<BoxWithPadding>
					<Button color="primary" onClick={() => {handleDataType("quantityPercentage");}} variant="contained">
						{t("quantity")}
					</Button>
				</BoxWithPadding>
			</FlexBox>
			<FlexBox margin={"0 -0.5rem"}>
				<BoxWithPadding>
					<Button color="info" onClick={() => {handleSetChartType("line");}} variant="contained">
						{t("line")}
					</Button>
				</BoxWithPadding>
				<BoxWithPadding>
					<Button color="info" className="" onClick={() => {handleSetChartType("bar");}} variant="contained">
						{t("bar")}
					</Button>	
				</BoxWithPadding>
				<BoxWithPadding>
					<Button color="info" className="" onClick={() => {handleSetChartType("polarArea");}} variant="contained">
						{t("polar-area")}
					</Button>	
				</BoxWithPadding>
			</FlexBox>
		</XBetween>
		
		<Box position={"relative"} height={"500px"} width={"100%"}>
			<Chart
				type={chartType}
				ref={chartRef}
				data={chartData}
				// data={{
				// 	labels: ["1", "2", "3"],
				// 	datasets: [
				// 		{
				// 			label: t("percentage"),
				// 			data: [1, 2, 3],
				// 			fill: true,
				// 			backgroundColor: "blue"
				// 		}
				// 	] }}
				options={{
					maintainAspectRatio: false,
					responsive: true,
					scales: {
						y: {
							offset: true,
							title: {
								display: true,
								text: "%",
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
							// offset: true,
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
								text: t("type"),
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
						legend: { display: false }
					}
				}}
			/>
		</Box>
	</Box>;
}