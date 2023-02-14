import { LegendItem, Plugin } from "chart.js";
import { WeatherChartLegendSlice } from "features/chart/weatherLegend";
import { store } from "store";

export const chartLegendPlugin: Plugin<"line"> = {
	id: "chartLegend",
	afterUpdate(chart) {
		const legendItems = chart?.options.plugins?.legend?.labels?.generateLabels?.(chart);
		
		if (legendItems) {
			const sortedLegendItems = chart.data.datasets.map(d => {
				const item = legendItems.find(l => l.text === d.label) as LegendItem;
				return item;
			});
	
			if (legendItems) {
				store.dispatch(WeatherChartLegendSlice.actions.setLegendItems(sortedLegendItems));
			}
		}
	}
};