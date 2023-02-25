import { getChartData, waterResponseDataProcess } from "../lib";
import React from "react";
import { Line } from "react-chartjs-2";
import { useGetReservoirDataQuery, useGetReservoirEveryHourServiceQuery } from "service/water/get";
import { useAppSelector } from "src/app/hooks";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { useTranslation } from "react-i18next";

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

export function WaterChart() {
	const { data: reservoirEveryDayServiceData } = useGetReservoirEveryHourServiceQuery();
	const { data: reservoirData } = useGetReservoirDataQuery();
	const conditon = useAppSelector(state => state.water.condition);
	const data = (reservoirEveryDayServiceData && reservoirData) ? 
		waterResponseDataProcess(reservoirEveryDayServiceData, reservoirData, conditon): [];
	const mode = useAppSelector(state => state.theme.mode);
	const chartData = getChartData(data);
	const { t } = useTranslation("water");
	return <>
		<Line
			options={{
				scales: {
					x: {
						title: {
							padding: 20,
							display: true,
							text: t("reservoir"),
							color: mode === "light" ? "#1b1b1f": "#e3e2e6",
							font: {
								size: 32,
								family: "sans-serif, 'Noto Sans TC'",
							},
						},
						ticks: {
							// padding: 12,
							color: mode === "light" ? "#1b1b1f": "#e3e2e6",
							font: {
								size: 20,
								family: "sans-serif, 'Noto Sans TC'",
							},
						},
						
					},
					y: {
						offset: true,
						ticks: {
							color: mode === "light" ? "#1b1b1f": "#e3e2e6",
							callback(this, tickValue) {
								return `${tickValue}%`;
							},
						},
						max: 100,
						min: 0,
					}
				},
				plugins: {
					legend: {
						display: false
					}
				}
			}}
			// datasetIdKey='id'
			data={chartData}
		/>
	</>;
}
