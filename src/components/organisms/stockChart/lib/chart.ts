import { pathNames } from "../const";
import { BasicStockChartController } from "./charts/basicStockGraphController";
import { CrossHair } from "./charts/crossHair";
import { StockGraph, StockGraphLibName, StockRawData } from "./type";
import type { PaletteMode } from "@mui/material";

function getElementSize(element: HTMLElement) {
	const width = element.offsetWidth;
	const height = element.offsetHeight;
	return { width, height };
}

export class Chart {
	private container: HTMLDivElement;
	private basicStockChartController: BasicStockChartController;
	private containerSize: { width: number, height: number };
	private mode: PaletteMode;
	private crossHair: CrossHair;
	private graphs: StockGraph[];
	public registeredLibNames: StockGraphLibName[];

	constructor(
		container: HTMLDivElement,
		data: StockRawData,
		mode: PaletteMode,
		registeredLibNames: StockGraphLibName[]
	) {
		this.mode = mode;
		this.graphs = [];
		this.container = container;
		this.containerSize = getElementSize(this.container);
		this.basicStockChartController = new BasicStockChartController(this.containerSize, data, mode);
		this.crossHair;
		this.registeredLibNames = registeredLibNames;
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
		this.updateGraphLib(this.registeredLibNames);
		const canvas = this.createGraphCanvas();
		canvas.style.zIndex = "10";
		this.container.appendChild(canvas);
		this.crossHair = new CrossHair(canvas, this.graphs, this.basicStockChartController, this.mode);
	};

	updateGraphLib = (names: StockGraphLibName[]) => {
		names.forEach(n => {
			const targetGraph = this.graphs.find(g => g.name === n);
			const canvas = this.createGraphCanvas();
			
			if (targetGraph === undefined) {
				import(`./charts/${pathNames[n]}`).then(({ [n]: Graph }) => {
					this.graphs.push({
						name: n,
						lib: Graph,
						graph: new Graph(canvas, this.basicStockChartController)
					});
					this.container.appendChild(canvas);
				});
			}
			
			if (targetGraph && targetGraph.lib && targetGraph.graph === null) {
				targetGraph.graph = new targetGraph.lib(canvas, this.basicStockChartController);
				this.container.appendChild(canvas);
			}
		});

		this.graphs.forEach(g => {
			const isGraphNameBothExist = names.find(n => n === g.name) ? false: true;
			if (isGraphNameBothExist) {
				g.graph?.canvas.remove();
				g.graph = null;
			}
		});
	};

	destroy = () => {
		this.crossHair.destroy();
	};
}