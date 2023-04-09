import { BasicChart } from "./basicChart";
import { ChartData, KLineBarRange, StockRawData } from "./type";
import type { PaletteMode } from "@mui/material";

export class KLines extends BasicChart {
	public data: ChartData;
	private risingColor: string;
	private fallingColor: string;
	public highestPrice: number;
	public lowestPrice: number;
	public barRanges: KLineBarRange[];
	// private padding: number;
	private wickColor: string;
	private axisLabelColor: string;
	// for x axis grid and label
	private xAxisShownIndexArray: number[];
	// for y axis grid and label
	private priceInterval: number;
	private priceHeight: number;
	// for drag
	private dragStartX: number;
	private movingIndex: number; // moved indexes in one drag
   
	constructor(canvas: HTMLCanvasElement, data: StockRawData, mode: PaletteMode) {
		super(canvas, data, mode);
		this.parsedRawData = this.parseData(data);
		this.currentRange = [data.length - 30, data.length - 1];
		this.data = this.getRangeData(this.currentRange[0], this.currentRange[1], this.parsedRawData);
		this.risingColor = "#FF0000";
		this.fallingColor = "#00FF00";
		// configure for k line
		this.wickColor = this.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.axisLabelColor = this.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.xAxisShownIndexArray = this.getXAxisShownIndexArray(this.data);
		this.priceInterval = this.getPriceInterval(this.highestPrice, this.lowestPrice, 5);
		// this.padding = 60;
		this.priceHeight = (this.canvas.height - this.padding * 2) / (this.highestPrice - this.lowestPrice);  
		this.barRanges = [];
		this.dragStartX;
		this.movingIndex = 0;
		this.canvas.addEventListener("wheel", this.handleScroll);

		this.canvas.addEventListener("mousedown", this.drag);
		
		this.draw();
	}

	draw() {
		this.clear();
		this.drawXGrid();
		this.drawYGrid();
		this.drawXLabels();
		this.drawKLines();
		this.drawYLabels();
	}

	getPriceInterval = (max: number, min: number, n: number) => {
		const range = max - min;
		const rawInterval = range / n;
		const magnitude = Math.floor(Math.log10(rawInterval));
		const scale = Math.pow(10, magnitude);
		const interval = Math.ceil(rawInterval / scale) * scale;
		return interval;
	};

	drawXGrid = () => {
		const numLabels = this.data.length;  // 顯示的日期標籤數量
		const labelIndices = this.getLabelIndices(numLabels);  // 取得要顯示日期標籤的index
		for (let i = 0; i < this.data.length; i++) {
			const labelIndex = labelIndices[i];
			const labelX = labelIndex * (this.barWidth + this.barSpacing) + this.barWidth / 2;

			if (this.xAxisShownIndexArray.indexOf(i) !== -1) {
				this.ctx.beginPath();
				this.ctx.moveTo(labelX, this.canvas.height);
				this.ctx.lineTo(labelX, 0);
				this.ctx.strokeStyle = "lightgrey";
				this.ctx.stroke();
			}
		}
	};

	drawYGrid = () => {
		const roundedLowestPrice = Math.floor(this.lowestPrice/100)*100;
		for (let i = roundedLowestPrice; i <= this.highestPrice; i += this.priceInterval) {
			const y = this.canvas.height - this.padding - (i - this.lowestPrice) * this.priceHeight;
			const x = this.canvas.width;
			this.ctx.beginPath();
			this.ctx.moveTo(x, y);
			this.ctx.lineTo(0, y);
			this.ctx.strokeStyle = "lightgrey";
			this.ctx.stroke();
		}
	};

	drawYLabels = () => {
		this.ctx.font = "12px Arial";
		this.ctx.textAlign = "right";
		this.ctx.textBaseline = "middle";
		this.ctx.fillStyle = this.axisLabelColor;
		const roundedLowestPrice = Math.floor(this.lowestPrice/100)*100;
		for (let i = roundedLowestPrice; i <= this.highestPrice; i += this.priceInterval) {
			const y = this.canvas.height - this.padding - (i - this.lowestPrice) * this.priceHeight;
			const x = this.canvas.width;

			this.ctx.fillText(i.toFixed(2), x - 10, y);
		}
	};

	drawXLabels = () => {
		const labelSpacing = 5;  // 日期標籤之間的間距
		const numLabels = this.data.length;  // 顯示的日期標籤數量
		const labelIndices = this.getLabelIndices(numLabels);  // 取得要顯示日期標籤的index
		this.ctx.fillStyle = this.axisLabelColor;
		this.ctx.font = "12px Arial";
		this.ctx.textAlign = "center";
		for (let i = 0; i < this.data.length; i++) {
			const labelIndex = labelIndices[i];
			const labelX = labelIndex * (this.barWidth + this.barSpacing) + this.barWidth / 2;
			const labelDate = this.data[i][0];
			if (this.xAxisShownIndexArray.indexOf(i) !== -1) {
				this.ctx.fillText(labelDate, labelX, this.canvas.height - labelSpacing);
			}
		}
	};

	getXAxisShownIndexArray = (arr: unknown[]) => {
		const arrLength = arr.length;
		const shownNumber = 10;
		// 輸入陣列小於等於 10 時，回傳全部的 index
		if (arrLength <= shownNumber) {
			return Array.from(Array(arrLength), (_, index) => index);
		}
		// 輸入陣列大於 10 時，回傳 10 個均勻分布的 index
		const step = arrLength / shownNumber;
		return Array.from(Array(shownNumber), (_, index) => Math.round(index * step));
	};
	
	setKLinesConfigure = () => {
		this.highestPrice = this.getHighestPrice();
		this.lowestPrice = this.getLowestPrice();
		this.numBars = this.data.length;
		this.barWidth = this.canvas.width / this.numBars * 0.8;
		this.barSpacing = this.canvas.width / this.numBars * 0.2;
		this.xAxisShownIndexArray = this.getXAxisShownIndexArray(this.data);
		this.priceInterval = this.getPriceInterval(this.highestPrice, this.lowestPrice, 5);
		this.priceHeight = (this.canvas.height - this.padding * 2) / (this.highestPrice - this.lowestPrice);
	};

	getLabelIndices = (numLabels: number) => {
		const labelIndices = [0];
		const interval = Math.floor(this.numBars / (numLabels - 1));

		for (let i = 1; i < numLabels - 1; i++) {
			labelIndices.push(i * interval);
		}

		if (!labelIndices.includes(this.numBars - 1)) {
			labelIndices.push(this.numBars - 1);
		}

		return labelIndices;
	};

	handleScroll = (event: MouseEvent) => {
		// 防止滾動事件的預設行為
		event.preventDefault();
		// // 獲取滾動的方向以及滾動量
		const deltaY = event.movementY;
		// const deltaY = event.deltaY;
		const direction = deltaY > 0 ? 10 : -10;
		// // 在此處實現處理滾動事件的程式碼
		if (this.data.length > 20 || direction < 0) {
			this.currentRange = [this.currentRange[0] + direction, this.currentRange[1]];
			this.data = this.getRangeData(this.currentRange[0], this.currentRange[1], this.parsedRawData);
			this.setKLinesConfigure();
			// // 重繪 Canvas
			this.draw();
		}
	};

	onMouseMove = (event: MouseEvent) => {
		// 獲取滑鼠移動時的位置
		const x = event.clientX;
		// 計算滑鼠移動的距離
		const movingIndex = Math.floor((x - this.dragStartX)/5);
		// check range that is not over the latest date
		if (this.currentRange[1] - movingIndex < this.parsedRawData.length - 1) {
			this.movingIndex = movingIndex;
			this.data = this.getRangeData(this.currentRange[0] - movingIndex, this.currentRange[1] - movingIndex, this.parsedRawData);
			this.setKLinesConfigure();
			// // 重繪 Canvas
			// this.clear();
			this.draw();
		}
		// if the changed range is over the latest date, set the ranges to the latest date
		if (this.currentRange[1] - movingIndex >= this.parsedRawData.length - 1 && movingIndex < 0) {
			this.data = this.getRangeData(this.currentRange[0], this.parsedRawData.length - 1, this.parsedRawData);
			this.setKLinesConfigure();
			// this.clear();
			this.draw();
		}
	};

	onMouseUp = () => {
		this.currentRange = [this.currentRange[0] - this.movingIndex, this.currentRange[1] - this.movingIndex];
		// reset after every drag, or it could affect next drag
		this.movingIndex = 0;
		// 當滑鼠放開時，移除mousemove事件監聽器
		document.removeEventListener("mousemove", this.onMouseMove);
		// 移除mouseup事件監聽器
		document.removeEventListener("mouseup", this.onMouseUp);
	};

	drag = (event: MouseEvent) => {
		// 當mousedown事件被觸發時，執行此回調函數
		// 獲取滑鼠按下時的位置
		this.dragStartX = event.clientX;
		// 當滑鼠按下時，設置mousemove事件監聽器
		document.addEventListener("mousemove", this.onMouseMove);
		// 當滑鼠放開時，移除mousemove事件監聽器
		document.addEventListener("mouseup", this.onMouseUp);
	};

	drawKLines = () => {
		const drawingRangeHeight = this.canvas.height - 2*this.padding;
		this.barRanges = [];

		for (let i = 0; i < this.data.length; i++) {
			const item = this.data[i];
			const [, openPrice, highPrice, lowPrice, closePrice] = item;
			const x = i * (this.barWidth + this.barSpacing);
			const y = (this.highestPrice - highPrice) / (this.highestPrice - this.lowestPrice) * drawingRangeHeight;
			const height = Math.abs(highPrice - lowPrice) / (this.highestPrice - this.lowestPrice) * drawingRangeHeight;

			this.barRanges.push({
				range: [x, x + this.barWidth],
				data: this.data[i]
			});

			this.ctx.beginPath();
			this.ctx.moveTo(x + this.barWidth / 2, y + this.padding);
			this.ctx.lineTo(x + this.barWidth / 2, y + height + this.padding);
			this.ctx.strokeStyle = this.wickColor;
			this.ctx.stroke();

			if (closePrice >= openPrice) {
				this.ctx.fillStyle = this.risingColor;
				const closeY = this.padding + (this.highestPrice - closePrice) / (this.highestPrice - this.lowestPrice) * drawingRangeHeight;
				const openY = this.padding + (this.highestPrice - openPrice) / (this.highestPrice - this.lowestPrice) * drawingRangeHeight;
				this.ctx.fillRect(x, closeY, this.barWidth, Math.abs(closeY - openY));
			} else {
				this.ctx.fillStyle = this.fallingColor;
				const closeY = this.padding + (this.highestPrice - closePrice) / (this.highestPrice - this.lowestPrice) * drawingRangeHeight;
				const openY = this.padding + (this.highestPrice - openPrice) / (this.highestPrice - this.lowestPrice) * drawingRangeHeight;
				this.ctx.fillRect(x, openY, this.barWidth, Math.abs(closeY - openY));
			}
		}
	};

	setMode = (mode: PaletteMode) => {
		this.mode = mode;
		this.wickColor = this.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.axisLabelColor = this.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.draw();
	};
}