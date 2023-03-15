import React from "react";
import { ChartLegend } from "molecules";
import { useAppSelector } from "src/app/hooks";
import { Chart, ChartType } from "chart.js";
import { WeatherChartTData } from "pages/weatherForecast/typing";

export function WeatherChartLegend(props: { chart: Chart<ChartType, WeatherChartTData> | undefined}) {
	const legendItems = useAppSelector(state => state.weatherLegend.legendItems);
	
	const weatherDatasets = props.chart?.data.datasets;

	const legendItemsWithOrder = legendItems.map(l => {
	
		const dataset = weatherDatasets?.find(d => d.label === l.text);

		if (dataset) {
			return {
				...l,
				order: dataset.order
			};
		} else {
			return l;
		}
	});

	return <ChartLegend
		items={legendItemsWithOrder}
		chart={props.chart}
	/>;
}