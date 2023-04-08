import { BasicCanvas } from "./basic";
import type { PaletteMode } from "@mui/material";
import { ChartData, StockRawData } from "./type";
export class Line extends BasicCanvas {
	private parsedRawData: ChartData;
	private currentRange: [number, number];
	private foregroundCanvas: HTMLCanvasElement;
	public data: ChartData;
	public maTypesChosen = 1;
	public highestPrice: number;
	public lowestPrice: number;
	public barWidth: number;
	public barSpacing: number;
	private numBars: number;
	private axisLabelColor: string;
	// for x axis grid and label
	private xAxisShownIndexArray: number[];
	// for y axis grid and label
	private priceInterval: number;
	private priceHeight: number;

	// for drag
	private dragStartX: number;
	private movingIndex: number; // moved indexes in one drag

	constructor(canvas: HTMLCanvasElement, data: StockRawData, foregroundCanvas: HTMLCanvasElement, mode: PaletteMode) {
		super(canvas, mode);
		this.foregroundCanvas = foregroundCanvas;
		this.parsedRawData = this.parseData(data);
		this.currentRange = [data.length - 30, data.length - 1];
		this.data = this.getRangeData(this.currentRange[0], this.currentRange[1], this.parsedRawData);
		this.xAxisShownIndexArray = this.getXAxisShownIndexArray(this.data);
		this.priceInterval = this.getPriceInterval(this.highestPrice, this.lowestPrice, 5);
		this.priceHeight = (this.canvas.height - this.padding * 2) / (this.highestPrice - this.lowestPrice);  
		this.highestPrice = this.getHighestPrice();
		this.lowestPrice = this.getLowestPrice();
		this.numBars = this.data.length;
		this.barWidth = this.canvas.width / this.numBars * 0.8;
		this.barSpacing = this.canvas.width / this.numBars * 0.2;
		this.axisLabelColor = this.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.canvas.addEventListener("wheel", this.handleScroll);
		this.canvas.addEventListener("mousedown", this.drag);
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

	getRangeData = (startIndex: number, endIndex: number, data: ChartData) => {
		return data.slice(startIndex, endIndex + 1);
	};

	parseData = (data: StockRawData): ChartData => {
		const parsedData = [] ;
		for (let i = 0; i < data.length; i++) {
			const row = data[i];
			const parsedRow = [] as unknown as ChartData[number];
			for (let j = 0; j < row.length; j++) {
				if (j === 0) {
					parsedRow.push(row[j]);
				} else {
					const value = parseFloat(row[j].replace(/,/g, ""));
					parsedRow.push(value);
				}
			}
			parsedData.push(parsedRow);
		}

		return parsedData;
	};

	getMovingAverageData = (day: number, data: ChartData) => {
		const targetPrices = data;
		if (day === 0) {
			return [];
		}
		const ma = targetPrices ? targetPrices.map((_price, i: number) => {
			let total = 0;
			if (i >= day - 1) {
				for (let j = i - day + 1; j <= i; j++) {
					total += targetPrices[j][4];
				}
				return Math.round(100*(total/day))/100;
			} else {
				return null;
			}
		}): [];
		return ma;
	};

	getHighestPrice = () => {
		const highPrices = this.data.map(item => item[2]);
		return Math.max(...highPrices);
	};

	getLowestPrice = () => {
		const lowPrices = this.data.map(item => item[3]);
		return Math.min(...lowPrices);
	};

	setMode = (mode: PaletteMode) => {
		this.mode = mode;
	};

	draw() {
		this.clear();
		this.drawXGrid();
		this.drawYGrid();
		this.drawXLabels();
		this.drawYLabels();
		this.drawLine();
	}
	
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

	drawXGrid = () => {
		const numLabels = this.data.length;  // 顯示的日期標籤數量
		const labelIndices = this.getLabelIndices(numLabels);  // 取得要顯示日期標籤的index
		for (let i = 0; i < this.data.length; i++) {
			const labelIndex = labelIndices[i];
			const labelX = labelIndex * (this.barWidth + this.barSpacing) + this.barWidth / 2;
			//   const labelDate = this.data[i][0];
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

	drawLine = () => {
		const drawingRangeHeight = this.canvas.height - 2*this.padding;
		const { highestPrice, lowestPrice, barWidth, barSpacing } = this;
		const { ctx, data } = this;
		ctx.strokeStyle = "green";
		ctx.beginPath();
		for (let i = 0; i < data.length; i++) {
			const [,,,,closePrice] = data[i];
			const x = barWidth/2 + i * (barWidth + barSpacing);
			const y = (highestPrice - closePrice) / (highestPrice - lowestPrice) * drawingRangeHeight + this.padding;
			this.ctx.lineTo(x, y);
		}
		this.ctx.stroke();
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
			// this.clear();
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

	destroy = () => {
		this.foregroundCanvas.removeEventListener("mousemove", this.onMouseMove);
		this.foregroundCanvas.removeEventListener("wheel", this.handleScroll);
	};
}