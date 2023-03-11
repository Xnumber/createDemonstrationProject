import { LegendItem } from "chart.js";
export type ReduxLegendItem = Omit<LegendItem, "pointStyle">
export type WeatherLegendState = {
	legendItems: LegendItem[];
	topLayerDatasetIndex: number;
}