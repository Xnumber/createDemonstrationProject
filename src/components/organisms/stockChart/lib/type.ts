import { Line, KLines, MovingAverage } from "./charts";
import { BasicStockChartController } from "./charts/basicStockGraphController";
import { Grid } from "./charts/grid";

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

export type StockGraphLib = KLines | Line | MovingAverage | Grid;
export type StockGraphLibName = "KLines" | "Line" | "MovingAverage" | "Grid";
export type StockGraph = {
	name: StockGraphLibName;
	lib: (new (canvas: HTMLCanvasElement, basicStockChartController: BasicStockChartController) => StockGraphLib)
	graph: StockGraphLib | null
};