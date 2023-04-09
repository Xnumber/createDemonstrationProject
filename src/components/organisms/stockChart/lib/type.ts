import { BasicCanvas } from "./charts/basicCanvas";
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

export class StockGraph extends BasicCanvas {
	basicChartController: BasicStockChartController;
	constructor(canvas: HTMLCanvasElement, basicChartController: BasicStockChartController) {
		super(canvas);
		this.basicChartController = basicChartController;
	}
}
