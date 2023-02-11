import type { Chart, ChartType } from "chart.js";
import React from "react";
// import { FeatureType } from "src/typing";
import "./style.scss";
import { WeatherChartTData } from "pages/weatherForecast/typing";

// https://www.chartjs.org/docs/latest/samples/legend/html.html
export const ChartHtmlLegend = (props: { chart: Chart<ChartType, WeatherChartTData> | null}) => {
	const { chart } = props;

	const legendItems = chart?.options.plugins?.legend?.labels?.generateLabels?.(chart as unknown as Chart);

	return legendItems && chart ? <ul>
		{
			legendItems.map((item, i) => {
				const { text, hidden, fontColor, fillStyle } = item;
				const onclick = () => {
					const { datasetIndex } = item;
					if (datasetIndex !== undefined) {
						chart.setDatasetVisibility(datasetIndex, !chart.isDatasetVisible(datasetIndex));
						chart.update();
					}
				};
				
				return <li key={i} onClick={onclick}>
					<span className="m-legend__colorBox" style={{
						backgroundColor: fillStyle as string,
					}}>
					</span>
					<span style={{ color: fontColor as string , textDecoration: hidden ? "line-through": ""}}>
						{ text }
					</span>
				</li>;
			})
		}
	</ul>: null;
};