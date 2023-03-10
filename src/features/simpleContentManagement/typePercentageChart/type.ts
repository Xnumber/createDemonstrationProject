import { ChartData, ChartTypeRegistry } from "chart.js";

export type ContentChartData = ChartData<keyof ChartTypeRegistry, number[]>