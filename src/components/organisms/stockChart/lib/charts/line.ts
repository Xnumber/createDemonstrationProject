import type { PaletteMode } from "@mui/material";
import { BasicStockChartController } from "./basicStockGraphController";
import { BasicCanvas } from "./basicCanvas";
// import { KLineBarRange } from "../type";

export class Line extends BasicCanvas {
	// public data: ChartData;
	// for drag
	private dragStartX: number;
	public basicChartController: BasicStockChartController;
	// private movingIndex: number; // moved indexes in one drag
	// public barRanges: KLineBarRange[];
	private gradient: CanvasGradient;

	constructor(canvas: HTMLCanvasElement, basicChartController: BasicStockChartController) {
		super(canvas);
		this.basicChartController = basicChartController;
		// this.parsedRawData = this.parseData(data);
		// this.currentRange = [data.length - 30, data.length - 1];
		// this.data = this.getRangeData(this.currentRange[0], this.currentRange[1], this.parsedRawData);
		// configure for k line
		// this.axisLabelColor = this.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		// this.priceInterval = this.getPriceInterval(this.highestPrice, this.lowestPrice, 5);
		// this.padding = 60;
		// this.priceHeight = (this.canvas.height - this.padding * 2) / (this.highestPrice - this.lowestPrice);  
		// this.barRanges = [];
		this.dragStartX;
		this.gradient = this.ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
		this.gradient.addColorStop(0, "rgba(0, 150, 255, 0.5)");
		this.gradient.addColorStop(1, "rgba(0, 150, 255, 1)");
		// this.movingIndex = 0;
		// this.canvas.addEventListener("wheel", this.handleScroll);
		// this.canvas.addEventListener("mousedown", this.drag);
		this.draw();
	}

	draw() {
		this.clear();
		this.drawLine();
	}

	getPriceInterval = (max: number, min: number, n: number) => {
		const range = max - min;
		const rawInterval = range / n;
		const magnitude = Math.floor(Math.log10(rawInterval));
		const scale = Math.pow(10, magnitude);
		const interval = Math.ceil(rawInterval / scale) * scale;
		return interval;
	};

	// handleScroll = (event: MouseEvent) => {
	// 	// 防止滾動事件的預設行為
	// 	event.preventDefault();
	// 	// // 獲取滾動的方向以及滾動量
	// 	const deltaY = event.movementY;
	// 	// const deltaY = event.deltaY;
	// 	const direction = deltaY > 0 ? 10 : -10;
	// 	// // 在此處實現處理滾動事件的程式碼
	// 	if (this.data.length > 20 || direction < 0) {
	// 		this.currentRange = [this.currentRange[0] + direction, this.currentRange[1]];
	// 		this.data = this.getRangeData(this.currentRange[0], this.currentRange[1], this.parsedRawData);
	// 		this.setKLinesConfigure();
	// 		// // 重繪 Canvas
	// 		this.draw();
	// 	}
	// };

	// onMouseMove = (event: MouseEvent) => {
	// 	// 獲取滑鼠移動時的位置
	// 	const x = event.clientX;
	// 	// 計算滑鼠移動的距離
	// 	const movingIndex = Math.floor((x - this.dragStartX)/5);
	// 	// check range that is not over the latest date
	// 	if (this.currentRange[1] - movingIndex < this.parsedRawData.length - 1) {
	// 		this.movingIndex = movingIndex;
	// 		this.data = this.getRangeData(this.currentRange[0] - movingIndex, this.currentRange[1] - movingIndex, this.parsedRawData);
	// 		this.setKLinesConfigure();
	// 		// // 重繪 Canvas
	// 		// this.clear();
	// 		this.draw();
	// 	}
	// 	// if the changed range is over the latest date, set the ranges to the latest date
	// 	if (this.currentRange[1] - movingIndex >= this.parsedRawData.length - 1 && movingIndex < 0) {
	// 		this.data = this.getRangeData(this.currentRange[0], this.parsedRawData.length - 1, this.parsedRawData);
	// 		this.setKLinesConfigure();
	// 		// this.clear();
	// 		this.draw();
	// 	}
	// };

	// onMouseUp = () => {
	// 	this.currentRange = [this.currentRange[0] - this.movingIndex, this.currentRange[1] - this.movingIndex];
	// 	// reset after every drag, or it could affect next drag
	// 	this.movingIndex = 0;
	// 	// 當滑鼠放開時，移除mousemove事件監聽器
	// 	document.removeEventListener("mousemove", this.onMouseMove);
	// 	// 移除mouseup事件監聽器
	// 	document.removeEventListener("mouseup", this.onMouseUp);
	// };

	// drag = (event: MouseEvent) => {
	// 	// 當mousedown事件被觸發時，執行此回調函數
	// 	// 獲取滑鼠按下時的位置
	// 	this.dragStartX = event.clientX;
	// 	// 當滑鼠按下時，設置mousemove事件監聽器
	// 	document.addEventListener("mousemove", this.onMouseMove);
	// 	// 當滑鼠放開時，移除mousemove事件監聽器
	// 	document.addEventListener("mouseup", this.onMouseUp);
	// };

	drawLine = () => {
		const drawingRangeHeight = this.canvas.height - 2*this.padding;
		const { highestPrice, lowestPrice, barWidth, barSpacing, data } = this.basicChartController;
		const { ctx, canvas } = this;
		ctx.beginPath();
		ctx.strokeStyle = "rgba(0, 0, 0, 0)";
		for (let i = 0; i < data.length; i++) {
			const [,,,,closePrice] = data[i];
			const x = barWidth/2 + i * (barWidth + barSpacing);
			const y = (highestPrice - closePrice) / (highestPrice - lowestPrice) * drawingRangeHeight + this.padding;
			ctx.lineTo(x, y);
		}
		const firstX = barWidth/2;
		const lastX = barWidth/2 + (data.length - 1) * (barWidth + barSpacing);
		ctx.lineTo(lastX, canvas.height);
		ctx.lineTo(firstX, canvas.height);
		ctx.closePath();
		ctx.fillStyle = this.gradient;
		ctx.fill();
		ctx.stroke();
	};

	setMode = (mode: PaletteMode) => {
		this.mode = mode;
		this.draw();
	};
}