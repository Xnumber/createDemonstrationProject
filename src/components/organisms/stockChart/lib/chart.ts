import { BasicStockChartController } from "./charts/basicStockGraphController";
import { CrossHair } from "./charts/crossHair";
import { StockGraphLib, StockGraphLibName, StockRawData } from "./type";
import type { PaletteMode } from "@mui/material";

const pathNames = {
	"KLines": "kLines",
	"Line": "line",
	"MovingAverage": "movingAverage",
};

function getElementSize(element: HTMLElement) {
	const width = element.offsetWidth;
	const height = element.offsetHeight;
	return { width, height };
}

export class Chart {
	private container: HTMLDivElement;
	private basicStockChartController: BasicStockChartController;
	// private graphs: StockGraphLib[];
	private containerSize: { width: number, height: number };
	// private mode: PaletteMode;
	private crossHair: CrossHair;
	public chosenGraphNames: StockGraphLibName[];
	private graphs: {
		name: StockGraphLibName;
		lib: (new (canvas: HTMLCanvasElement, basicStockChartController: BasicStockChartController) => StockGraphLib)
		graph: StockGraphLib
	}[];
	public registeredLibNames: StockGraphLibName[];

	constructor(
		container: HTMLDivElement,
		data: StockRawData,
		mode: PaletteMode,
		registeredLibNames: StockGraphLibName[]
	) {
		// this.mode = mode;
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
		this.container.appendChild(canvas);
		// this.crossHair = new CrossHair(canvas, this.graphs, this.basicStockChartController, this.mode);
	};
	
	setChosenGraphNames = (names: StockGraphLibName[]) => {
		this.chosenGraphNames = names;
	};

	updateGraphLib = (names: StockGraphLibName[]) => {
		names.forEach(n => {
			const targetGraph = this.graphs.find(g => g.name === n);
			const canvas = this.createGraphCanvas();
			
			if (targetGraph === undefined) {
				import(`./charts/${pathNames[n]}`).then(({ [n]: Graph }) => {
					console.log(n, Graph);
					this.graphs.push({
						name: n,
						lib: Graph,
						graph: new Graph(canvas, this.basicStockChartController)
					});
					this.container.appendChild(canvas);
				});
			}
			
			if (targetGraph && targetGraph.lib) {
				targetGraph.graph = new targetGraph.lib(canvas, this.basicStockChartController);
				this.container.appendChild(canvas);
			}
		});
	};
}
