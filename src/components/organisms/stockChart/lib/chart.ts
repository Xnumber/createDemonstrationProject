import { BasicStockChartController } from "./charts/basicStockGraphController";
import { StockGraphLib, StockRawData } from "./type";
import type { PaletteMode } from "@mui/material";

function getElementSize(element: HTMLElement) {
	const width = element.offsetWidth;
	const height = element.offsetHeight;
	return { width, height };
}

export class Chart {
	private container: HTMLDivElement;
	private basicStockChartController: BasicStockChartController;
	private graphs: StockGraphLib[];
	private containerSize: { width: number, height: number };

	constructor(
		container: HTMLDivElement,
		data: StockRawData, 
		private stockGraphLibs: (new (canvas: HTMLCanvasElement, basicStockChartController: BasicStockChartController) => StockGraphLib)[], 
		mode: PaletteMode
	) {
		this.stockGraphLibs = stockGraphLibs;
		this.graphs = [];
		this.container = container;
		this.containerSize = getElementSize(this.container);
		this.basicStockChartController = new BasicStockChartController(this.containerSize, data, mode);
		this.setUpChart();
	}
	
	setUpChart = () => {
		this.stockGraphLibs.forEach(CL => {
			const canvas = document.createElement("canvas");
			canvas.width = this.containerSize.width;
			canvas.height = this.containerSize.height;
			this.graphs.push(new CL(canvas, this.basicStockChartController));
			this.container.appendChild(canvas);
		});
	};
}