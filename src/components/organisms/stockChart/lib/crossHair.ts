import { BasicCanvas } from "./basic";

export class CrossHair extends BasicCanvas {
	protected canvas: HTMLCanvasElement;
	protected chartCanvas: HTMLCanvasElement;
	// ctx: CanvasRenderingContext2D;
	canvasRect: DOMRect;
	canvasX: number;
	canvasY: number;

	constructor(canvas: HTMLCanvasElement, chartCanvas: HTMLCanvasElement) {
		super(canvas);
		this.canvas = canvas;
		this.chartCanvas = chartCanvas;
		this.ctx.strokeStyle = "#000";
		this.ctx.setLineDash([5, 5]);
		this.ctx.lineWidth = 1;
		// 計算畫布在文檔中的位置
		this.canvasRect = this.canvas.getBoundingClientRect();
		this.canvasX = this.canvasRect.left;
		this.canvasY = this.canvasRect.top;
		this.canvas.addEventListener("mousemove", this.drawCrossHair);
		this.canvas.addEventListener("wheel", this.handleScroll);
	}

	drawCrossHair = (event: MouseEvent) => {
		this.clear();
		const x = event.clientX - this.canvasX;
		const y = event.clientY - this.canvasY;
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

}