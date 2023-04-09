import { PaletteMode } from "@mui/material";
import { BasicCanvas } from "./basicCanvas";

export class CrossHair extends BasicCanvas {
	protected canvas: HTMLCanvasElement;
	protected chartCanvas: HTMLCanvasElement;
	canvasRect: DOMRect;
	canvasX: number;
	canvasY: number;

	constructor(canvas: HTMLCanvasElement, chartCanvas: HTMLCanvasElement, mode: PaletteMode) {
		super(canvas, mode);
		this.canvas = canvas;
		this.chartCanvas = chartCanvas;
		this.ctx.strokeStyle = this.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.ctx.setLineDash([5, 5]);
		this.ctx.lineWidth = 1;
		// 計算畫布在文檔中的位置
		this.canvasRect = this.canvas.getBoundingClientRect();
		this.canvasX = this.canvasRect.left;
		this.canvasY = this.canvasRect.top;
		this.canvas.addEventListener("mousemove", this.drawCrossHair);
		this.canvas.addEventListener("mouseout", this.handleMouseOut);
		this.canvas.addEventListener("wheel", this.handleScroll);
		this.canvas.addEventListener("mousedown", this.handleMouseDown);
		this.canvas.addEventListener("mouseup", this.handleMouseDown);
	}

	setMode = (mode: PaletteMode) => {
		this.mode = mode;
		this.ctx.strokeStyle = this.mode === "dark" ? "#e3e2e6": "#1b1b1f";
	};

	drawCrossHair = (event: MouseEvent) => {
		this.clear();
		const x = event.clientX - this.canvasX;
		const y = event.clientY - this.canvasY + window.scrollY;
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

	handleScroll = (e: WheelEvent) => {
		e.preventDefault();
		const event = new MouseEvent("wheel", {
			bubbles: true,
			cancelable: true,
			view: window,
			movementY: e.deltaY,
		});
		this.chartCanvas.dispatchEvent(event);
	};

	handleMouseDown = (e: MouseEvent) => {
		const event = new MouseEvent("mousedown", {
			bubbles: false,
			cancelable: true,
			view: window,
			clientX: e.clientX,
		});
		this.chartCanvas.dispatchEvent(event);
	};

	handleMouseUp = () => {
		const event = new MouseEvent("mouseup", {
			bubbles: false,
			cancelable: true,
			view: window,
		});
		this.chartCanvas.dispatchEvent(event);
	};

	handleMouseOut = () => {
		this.clear();
	};
}