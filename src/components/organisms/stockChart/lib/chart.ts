import { pathNames } from "../const";
import { BasicStockChartController } from "./charts/basicStockGraphController";
import { CrossHair } from "./charts/crossHair";
import { StockGraph, StockGraphLibName, StockRawData } from "./type";
import type { PaletteMode } from "@mui/material";
import "./style.scss";
import { YAxis } from "./utils/yAxis";

function getElementSize(element: HTMLElement) {
	const width = element.offsetWidth;
	const height = element.offsetHeight;
	return { width, height };
}

export class Chart {
	private container: HTMLDivElement;
	private basicStockChartController: BasicStockChartController;
	// private containerSize: { width: number, height: number };
	private graphSize: { width: number, height: number };
	private yAxisContainerSize: { width: number, height: number };
	// private xAxisContainerSize: { width: number, height: number };
	private mode: PaletteMode;
	private crossHair: CrossHair;
	private graphs: StockGraph[];
	public registeredLibNames: StockGraphLibName[];
	private bodyContainer: HTMLDivElement;
	private graphsContainer: HTMLDivElement;
	private yAxisContainer: HTMLDivElement;
	private xAxisContainer: HTMLDivElement;
	private footerContainer: HTMLDivElement;
	private yAxis: YAxis;

	constructor(
		container: HTMLDivElement,
		data: StockRawData,
		mode: PaletteMode,
		registeredLibNames: StockGraphLibName[]
	) {
		this.mode = mode;
		this.graphs = [];
		this.container = container;
		this.prepareContainers();
		this.containerSize = getElementSize(this.container);
		this.graphSize = getElementSize(this.graphsContainer);
		this.yAxisContainerSize = getElementSize(this.yAxisContainer);
		this.xAxisContainerSize = getElementSize(this.xAxisContainer);
		this.basicStockChartController = new BasicStockChartController(this.graphSize, data, mode);
		this.crossHair;
		this.registeredLibNames = registeredLibNames;
		this.setUpChart();
	}

	prepareContainers = () => {
		this.graphsContainer = document.createElement("div");
		this.bodyContainer = document.createElement("div");
		this.yAxisContainer = document.createElement("div");
		this.xAxisContainer = document.createElement("div");
		this.footerContainer = document.createElement("div");
		const widgetContainer = document.createElement("div");
		this.graphsContainer.classList.add("stockChart__graphs");
		this.bodyContainer.classList.add("stockChart__body");
		this.yAxisContainer.classList.add("stockChart__yAxis");
		this.xAxisContainer.classList.add("stockChart__xAxis");
		this.footerContainer.classList.add("stockChart__footer");
		widgetContainer.classList.add("stockChart__widget");

		this.bodyContainer.appendChild(this.graphsContainer);
		this.bodyContainer.appendChild(this.yAxisContainer);
		this.footerContainer.appendChild(this.xAxisContainer);
		this.footerContainer.appendChild(widgetContainer);
		this.container.appendChild(this.bodyContainer);
		this.container.appendChild(this.footerContainer);
	};

	createGraphCanvas = (size?: {width: number, height: number}) => {
		const canvas = document.createElement("canvas");
		if (size) {
			canvas.width = size.width;
			canvas.height = size.height;
			return canvas;
		} else {
			canvas.width = this.graphSize.width;
			canvas.height = this.graphSize.height;
			canvas.style.position = "absolute";
			return canvas;
		}
	};

	setUpChart = () => {
		this.updateGraphLib(this.registeredLibNames);
		const canvas = this.createGraphCanvas();
		const yAxisCanvas = this.createGraphCanvas(this.yAxisContainerSize);
		canvas.style.zIndex = "10";

		this.yAxisContainer.appendChild(yAxisCanvas);
		this.yAxis = new YAxis(yAxisCanvas, this.basicStockChartController, this.mode);
		this.graphsContainer.appendChild(canvas);
		this.crossHair = new CrossHair(
			canvas, 
			this.graphs,
			[this.yAxis],
			this.basicStockChartController,
			this.mode
		);
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
					this.graphsContainer.appendChild(canvas);
				});
			}
			
			if (targetGraph && targetGraph.lib && targetGraph.graph === null) {
				targetGraph.graph = new targetGraph.lib(canvas, this.basicStockChartController);
				this.graphsContainer.appendChild(canvas);
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