import type { Chart, ChartType, LegendItem } from "chart.js";
import { WeatherChartTData } from "pages/weatherForecast/typing";

export type ChartLegendProps = { 
	chart: Chart<ChartType, WeatherChartTData> | undefined; 
	items: (LegendItem & { order?: number })[] | undefined;
}