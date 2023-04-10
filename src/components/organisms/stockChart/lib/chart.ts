import { BasicStockChartController } from "./charts/basicStockGraphController";
import { CrossHair } from "./charts/crossHair";
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
	private graphCanvases: HTMLCanvasElement[];
	private containerSize: { width: number, height: number };
	private mode: PaletteMode;
	private crossHair: CrossHair; 
	constructor(
		container: HTMLDivElement,
		data: StockRawData, 
		private stockGraphLibs: (new (canvas: HTMLCanvasElement, basicStockChartController: BasicStockChartController) => StockGraphLib)[], 
		mode: PaletteMode
	) {
		this.mode = mode;
		this.stockGraphLibs = stockGraphLibs;
		this.graphs = [];
		this.container = container;
		this.containerSize = getElementSize(this.container);
		this.basicStockChartController = new BasicStockChartController(this.containerSize, data, mode);
		this.graphCanvases = [];
		this.crossHair;
		this.setUpChart();
	}
	
	createGraphCanvas = () => {
		const canvas = document.createElement("canvas");
		canvas.width = this.containerSize.width;
		canvas.height = this.containerSize.height;
		canvas.style.position = "absolute";
		return canvas;
	};

	setUpChart = () => {
		this.stockGraphLibs.forEach(CL => {
			const canvas = this.createGraphCanvas();
			this.graphCanvases.push(canvas);
			this.graphs.push(new CL(canvas, this.basicStockChartController));
			this.container.appendChild(canvas);
		});
		
		const canvas = this.createGraphCanvas();
		this.container.appendChild(canvas);
		this.crossHair = new CrossHair(canvas, this.graphs, this.basicStockChartController, this.mode);
	};
}