import { PaletteMode } from "@mui/material";
import { BasicCanvas } from "./basicCanvas";
import { StockGraphLib } from "../type";
import { BasicStockChartController } from "./basicStockGraphController";

export class CrossHair extends BasicCanvas {
	protected chartCanvas: HTMLCanvasElement;
	canvasRect: DOMRect;
	canvasX: number;
	canvasY: number;
	basicStockChartController: BasicStockChartController;
	graphCanvases: StockGraphLib[];
	x: number;
	y: number;

	constructor(
		canvas: HTMLCanvasElement, 
		graphs: StockGraphLib[], 
		basicStockChartController: BasicStockChartController,
		mode: PaletteMode
	) {
		super(canvas);
		this.canvas = canvas;
		this.basicStockChartController = basicStockChartController,
		this.graphCanvases = graphs;
		// this.chartCanvas = chartCanvas;
		this.ctx.strokeStyle = mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.ctx.setLineDash([5, 5]);
		this.ctx.lineWidth = 1;
		// 計算畫布在文檔中的位置
		this.canvasRect = this.canvas.getBoundingClientRect();
		this.canvasX = this.canvasRect.left;
		this.canvasY = this.canvasRect.top;
		this.canvas.addEventListener("mousemove", this.onCrossHariMouseMove);
		window.addEventListener("scroll", () => {
			this.canvasRect = this.canvas.getBoundingClientRect();
			this.canvasX = this.canvasRect.left;
			this.canvasY = this.canvasRect.top;
		});
		this.x;
		this.y;
		this.canvas.addEventListener("mouseout", this.handleMouseOut);
		this.canvas.addEventListener("wheel", this.onScroll);
		this.canvas.addEventListener("mousedown", this.onMouseDown);
	}

	setMode = (mode: PaletteMode) => {
		this.mode = mode;
		this.ctx.strokeStyle = this.mode === "dark" ? "#e3e2e6": "#1b1b1f";
	};

	draw = () => {
		this.clear();
		const { x, y } = this;
		// 畫水平線
		this.ctx.beginPath();
		this.ctx.moveTo(0, y);
		this.ctx.lineTo(this.canvas.width, y);
		this.ctx.stroke();
		// 畫垂直線
		this.ctx.beginPath();
		this.ctx.moveTo(x, 0);
		this.ctx.lineTo(x, this.canvas.height);
		this.ctx.stroke();
	};
	
	onScroll = (e: WheelEvent) => {
		e.preventDefault();
		this.basicStockChartController.handleScroll(e);
		this.graphCanvases.forEach(g => {
			g.draw();
		});
	};
	
	onMouseDown = (e: WheelEvent) => {
		e.preventDefault();
		this.basicStockChartController.handleMouseDown(e);
		document.addEventListener("mousemove", this.onMouseMove);
	};
	
	onCrossHariMouseMove = (e: MouseEvent) => {
		this.x = e.clientX - this.canvasX;
		this.y = e.clientY - this.canvasY;
		this.draw();
	};

	onMouseMove = (e: MouseEvent) => {
		e.preventDefault();
		this.graphCanvases.forEach(g => {
			g.draw();
		});
	};
	
	onMouseUp = (e: MouseEvent) => {
		e.preventDefault();
		this.basicStockChartController.handleMouseUp();
		document.removeEventListener("mousemove", this.onMouseMove);
	};

	handleMouseOut = () => {
		this.clear();
	};
}