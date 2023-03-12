import { ChartData, ChartTypeRegistry } from "chart.js";
export type PercentageChartType = "line" | "bar" | "polarArea";
export type ContentChartData = ChartData<keyof ChartTypeRegistry, number[]>