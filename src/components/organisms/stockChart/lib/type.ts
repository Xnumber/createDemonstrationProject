import { Line, KLines, MovingAverage } from "./charts";
import { BasicStockChartController } from "./charts/basicStockGraphController";

export type StockRawData = [string, string, string, string, string][];
export type ChartData = [string, number, number, number, number][];
export type KLineBarRange = {
	range: [number, number],
	data: ChartData[number]
};
export type MAConfigure = {
	day: number;
	color: string;
	display: boolean;
};

export type StockGraphLib = KLines | Line | MovingAverage;
export type StockGraphLibName = "KLines" | "Line" | "MovingAverage";
export type StockGraph = {
	name: StockGraphLibName;
	lib: (new (canvas: HTMLCanvasElement, basicStockChartController: BasicStockChartController) => StockGraphLib)
	graph: StockGraphLib | null
};