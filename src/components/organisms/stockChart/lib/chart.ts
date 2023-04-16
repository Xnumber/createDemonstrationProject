import { pathNames } from "../const";
import { BasicStockChartController } from "./charts/basicStockGraphController";
import { CrossHair } from "./charts/crossHair";
import { StockGraph, StockGraphLibName, StockRawData, StockUtil } from "./type";
import type { PaletteMode } from "@mui/material";
import "./style.scss";
import { YAxis } from "./utils/yAxis";
import { XAxis } from "./utils/xAxis";
import { StockChartHeader } from "./utils/header";
import { ContextMenu } from "./utils/contextMenu";
import { Loading } from "./utils/loading";

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
	private xAxisContainerSize: { width: number, height: number };
	private headerContainerSize: { width: number, height: number };
	private mode: PaletteMode;
	private crossHair: CrossHair;
	public graphs: StockGraph[];
	public registeredLibNames: StockGraphLibName[];
	private headerContainer: HTMLDivElement;
	private bodyContainer: HTMLDivElement;
	private graphsContainer: HTMLDivElement;
	private yAxisContainer: HTMLDivElement;
	private xAxisContainer: HTMLDivElement;
	private footerContainer: HTMLDivElement;
	private yAxis: YAxis;
	private xAxis: XAxis;
	private header: StockChartHeader;
	private utils: StockUtil[];
	private contextMenu: ContextMenu;
	public loading: Loading;
	constructor(
		container: HTMLDivElement,
		data: StockRawData,
		mode: PaletteMode,
		registeredLibNames: StockGraphLibName[]
	) {
		this.mode = mode;
		this.graphs = [];
		this.utils = [];
		this.container = container;
		this.prepareContainers();
		// this.containerSize = getElementSize(this.container);
		this.graphSize = getElementSize(this.graphsContainer);
		this.yAxisContainerSize = getElementSize(this.yAxisContainer);
		this.xAxisContainerSize = getElementSize(this.xAxisContainer);
		this.headerContainerSize = getElementSize(this.headerContainer);
		this.basicStockChartController = new BasicStockChartController(this.graphSize, data, mode);
		this.crossHair;
		this.registeredLibNames = registeredLibNames;
		this.setUpChart();
	}

	prepareContainers = () => {
		this.headerContainer = document.createElement("div");
		this.graphsContainer = document.createElement("div");
		this.bodyContainer = document.createElement("div");
		this.yAxisContainer = document.createElement("div");
		this.xAxisContainer = document.createElement("div");
		this.footerContainer = document.createElement("div");
		const widgetContainer = document.createElement("div");
		this.container.classList.add("stockChart__container");
		this.headerContainer.classList.add("stockChart__header");
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
		this.container.appendChild(this.headerContainer);
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

	onCrossHairMouseMove = (e: MouseEvent) => {
		const x = e.clientX - (e.currentTarget as HTMLCanvasElement).getBoundingClientRect().left;
		const y = e.clientY - (e.currentTarget as HTMLCanvasElement).getBoundingClientRect().top;
		this.basicStockChartController.updateMouseStatus(x, y);
		this.header.draw();
	};

	setUpChart = () => {
		this.updateGraphLib(this.registeredLibNames);
		const canvas = this.createGraphCanvas();
		const contextMenuCanvas = this.createGraphCanvas();
		const yAxisCanvas = this.createGraphCanvas(this.yAxisContainerSize);
		const xAxisCanvas = this.createGraphCanvas(this.xAxisContainerSize);
		const headerCanvas = this.createGraphCanvas(this.headerContainerSize);
		const loadingCanvas = this.createGraphCanvas();
		canvas.style.zIndex = "10";
		contextMenuCanvas.style.zIndex = "20";
		contextMenuCanvas.style.display = "none";
		this.headerContainer.appendChild(headerCanvas);
		this.header = new StockChartHeader(headerCanvas, this.basicStockChartController);
		this.yAxisContainer.appendChild(yAxisCanvas);
		this.yAxis = new YAxis(yAxisCanvas, this.basicStockChartController, this.mode);
		this.xAxisContainer.appendChild(xAxisCanvas);
		this.xAxis = new XAxis(xAxisCanvas, this.basicStockChartController, this.mode);
		this.loading = new Loading(loadingCanvas, this.basicStockChartController);
		this.graphsContainer.appendChild(canvas);
		this.graphsContainer.appendChild(contextMenuCanvas);
		this.graphsContainer.appendChild(loadingCanvas);
		
		this.utils = [this.xAxis, this.yAxis, this.header];
		this.contextMenu = new ContextMenu(contextMenuCanvas, this.basicStockChartController, this);
		canvas.addEventListener("mousemove", this.onCrossHairMouseMove);

		this.crossHair = new CrossHair(
			canvas,
			this.graphs,
			this.utils,
			this.contextMenu,
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

	toggleGraph = async (graphName: StockGraphLibName) => {
		const graphAlreadyExist = this.graphs.find(g => g.name === graphName);
		const canvas = this.createGraphCanvas();
		
		if (graphAlreadyExist === undefined) {
			await import(`./charts/${pathNames[graphName]}`).then(({ [graphName]: Graph }) => {
				this.graphs.push({
					name: graphName,
					lib: Graph,
					graph: new Graph(canvas, this.basicStockChartController)
				});
				this.graphsContainer.appendChild(canvas);
			});
		}
		
		if (graphAlreadyExist && graphAlreadyExist.lib && graphAlreadyExist.graph) {
			graphAlreadyExist.graph?.canvas.remove();
			graphAlreadyExist.graph = null;
		} else if(graphAlreadyExist && graphAlreadyExist.lib && graphAlreadyExist.graph === null){
			this.graphsContainer.appendChild(canvas);
			graphAlreadyExist.graph = new graphAlreadyExist.lib(canvas, this.basicStockChartController);		
		}
	};
	
	setMode = (mode: PaletteMode) => {
		this.basicStockChartController.setMode(mode);
		this.crossHair.setMode();

		this.graphs.forEach(g => {
			g.graph?.setMode?.();
		});

		this.utils.forEach(u => {
			u.setMode?.();
		});
	};

	destroy = () => {
		this.crossHair.destroy();
		this.contextMenu.destroy();
	};
}