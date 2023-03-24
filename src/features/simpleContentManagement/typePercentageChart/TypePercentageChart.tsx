import React, { ReactNode, useCallback, useRef, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ChartType, BarElement, BarController, RadialLinearScale, ArcElement, PolarAreaController } from "chart.js";
import { Chart } from "react-chartjs-2";
import { useAppSelector } from "src/app/hooks";
import { useTranslation } from "react-i18next";
import { Box, Button } from "@mui/material";
import { XBetween } from "templates/xBetween";
import { FlexBox } from "templates/flexBox";
import { getTypePercentageTableData } from "../utils";
import { getChartOptions, getPercentageChartData } from "./util";
import { useGetSimpleContentQueryState } from "service/simpleContentManagement/get";
import { PercentageDataType } from "./type";

ChartJS.register(
	ArcElement,
	PolarAreaController,
	BarElement,
	BarController,
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
	const [dataType, setDataType] = useState<PercentageDataType>("cost-percentage");
	const condition = useAppSelector(state => state.listCondition);
	const { data } = useGetSimpleContentQueryState({ type: condition.type, searchString: condition.searchString });
	const { t } = useTranslation("simple-content-management");
	const handleSetChartType = useCallback((type: "line" | "bar" | "polarArea") => {
		setChartType(type);
	}, []);

	const typePercentageTableData = data ? getTypePercentageTableData(data.data): [];
	
	const chartData = getPercentageChartData(typePercentageTableData, dataType, chartType);
	const handleDataType = useCallback((type: PercentageDataType) => {
		setDataType(type);
	}, []);

	return <Box height={600}>
		<XBetween height={"100px"}>
			<FlexBox margin={"0 -0.5rem"}>
				<BoxWithPadding>
					<Button color="primary" onClick={() => {handleDataType("cost-percentage");}} variant="contained">
						{t("cost")}
					</Button>
				</BoxWithPadding>
				<BoxWithPadding>
					<Button color="primary" onClick={() => {handleDataType("quantity-percentage");}} variant="contained">
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
				options={getChartOptions(chartType, mode, dataType, t)}
			/>
		</Box>
	</Box>;
}