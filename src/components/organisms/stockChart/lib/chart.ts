import { BasicStockChartController } from "./charts/basicStockGraphController";
import { StockGraph, StockRawData } from "./type";
import type { PaletteMode } from "@mui/material";

function getElementSize(element: HTMLElement) {
	const width = element.offsetWidth;
	const height = element.offsetHeight;
	return { width, height };
}

export class Chart {
	private container: HTMLDivElement;
	private basicStockChartController: BasicStockChartController;
	private stockGraphs: (typeof StockGraph)[];
	private charts: StockGraph[];
	private containerSize: { width: number, height: number };

	constructor(container: HTMLDivElement, data: StockRawData, chartLibraries: (typeof StockGraph)[], mode: PaletteMode) {
		this.stockGraphs = chartLibraries;
		this.charts = [];
		this.container = container;
		this.containerSize = getElementSize(this.container);
		this.basicStockChartController = new BasicStockChartController(this.containerSize, data, mode);
		this.setUpChart();
	}
	
	setUpChart = () => {
		this.stockGraphs.forEach(CL => {
			const canvas = document.createElement("canvas");
			canvas.width = this.containerSize.width;
			canvas.height = this.containerSize.height;
			this.charts.push(new CL(canvas, this.basicStockChartController));
			this.container.appendChild(canvas);
		});
	};
}