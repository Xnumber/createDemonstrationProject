import { BasicCanvas } from "./basic";
import { ChartData, StockRawData } from "./type";

export class KLines extends BasicCanvas {
	private parsedRawData: ChartData;
	private currentRange: [number, number];
	private data: ChartData;
	private risingColor: string;
	private fallingColor: string;
	private highestPrice: number;
	private lowestPrice: number;
	private numBars: number;
	private barWidth: number;
	private barSpacing: number;
	private barRanges: { 
		range: [number, number],
		data: ChartData[number]
	}[];
	private padding: number;
	// for x axis grid and label
	private xAxisShownIndexArray: number[];
	// for y axis grid and label
	private priceInterval: number;
	private priceHeight: number;
	// for drag
	private dragStartX: number;
	private movingIndex: number; // moved indexes in one drag

	constructor(canvas: HTMLCanvasElement, data: StockRawData) {
		super(canvas);
		this.parsedRawData = this.parseData(data);
		this.currentRange = [data.length - 30, data.length];
		this.data = this.getRangeData(this.currentRange[0], this.currentRange[1], this.parsedRawData);
		this.risingColor = "#FF0000";
		this.fallingColor = "#00FF00";
		// configure for k line
		this.highestPrice = this.getHighestPrice();
		this.lowestPrice = this.getLowestPrice();
		this.numBars = this.data.length;
		this.barWidth = this.canvas.width / this.numBars * 0.8;
		this.barSpacing = this.canvas.width / this.numBars * 0.2;
		this.xAxisShownIndexArray = this.getXAxisShownIndexArray(this.data);
		this.priceInterval = this.getPriceInterval(this.highestPrice, this.lowestPrice, 5);
		this.padding = 60;
		this.priceHeight = (this.canvas.height - this.padding * 2) / (this.highestPrice - this.lowestPrice);  
		this.barRanges = [];
		this.dragStartX;
		this.movingIndex = 0;
		this.canvas.addEventListener("wheel", this.handleScroll);

		this.canvas.addEventListener("mousedown", this.drag.bind(this));
		
		this.draw();
	}

	draw() {
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

	drawYLabels = () => {
		this.ctx.font = "12px Arial";
		this.ctx.textAlign = "right";
		this.ctx.textBaseline = "middle";
		const roundedLowestPrice = Math.floor(this.lowestPrice/100)*100;
		for (let i = roundedLowestPrice; i <= this.highestPrice; i += this.priceInterval) {
			const y = this.canvas.height - this.padding - (i - this.lowestPrice) * this.priceHeight;
			const x = this.canvas.width;
			this.ctx.beginPath();
			this.ctx.moveTo(x, y);
			this.ctx.lineTo(x - 5, y);
			this.ctx.strokeStyle = "#000";
			this.ctx.stroke();
			this.ctx.fillStyle = "#000";
			this.ctx.fillText(i.toFixed(2), x - 10, y);
		}
	};

	drawXLabels = () => {
		const labelSpacing = 5;  // 日期標籤之間的間距
		const numLabels = this.data.length;  // 顯示的日期標籤數量
		const labelIndices = this.getLabelIndices(numLabels);  // 取得要顯示日期標籤的index
		this.ctx.fillStyle = "#000000";
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

	getHighestPrice = () => {
		const highPrices = this.data.map(item => item[2]);
		return Math.max(...highPrices);
	};

	getLowestPrice = () => {
		const lowPrices = this.data.map(item => item[3]);
		return Math.min(...lowPrices);
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
			this.clear();
			this.draw();
		}
	};

	onMouseMove = (event: MouseEvent) => {
		// 獲取滑鼠移動時的位置
		const x = event.clientX;
		// 計算滑鼠移動的距離
		const movingIndex = Math.floor((x - this.dragStartX)/5);
		this.movingIndex = movingIndex;
		this.data = this.getRangeData(this.currentRange[0] - movingIndex, this.currentRange[1] - movingIndex, this.parsedRawData);
		this.setKLinesConfigure();
		// // 重繪 Canvas
		this.clear();
		this.draw();
	};

	onMouseUp = () => {
		this.currentRange = [this.currentRange[0] - this.movingIndex, this.currentRange[1] - this.movingIndex];
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
		const paddingHeight = this.canvas.height - 2*this.padding;
		this.barRanges = [];

		for (let i = 0; i < this.data.length; i++) {
			const item = this.data[i];
			const [, openPrice, highPrice, lowPrice, closePrice] = item;
			const x = i * (this.barWidth + this.barSpacing);
			const y = (this.highestPrice - highPrice) / (this.highestPrice - this.lowestPrice) * paddingHeight;
			const height = Math.abs(highPrice - lowPrice) / (this.highestPrice - this.lowestPrice) * paddingHeight;

			this.barRanges.push({
				range: [x, x + this.barWidth],
				data: this.data[i]
			});

			this.ctx.beginPath();
			this.ctx.moveTo(x + this.barWidth / 2, y + this.padding);
			this.ctx.lineTo(x + this.barWidth / 2, y + height + this.padding);
			this.ctx.strokeStyle = "#000";
			this.ctx.stroke();

			if (closePrice >= openPrice) {
				this.ctx.fillStyle = this.risingColor;
				const closeY = this.padding + (this.highestPrice - closePrice) / (this.highestPrice - this.lowestPrice) * paddingHeight;
				const openY = this.padding + (this.highestPrice - openPrice) / (this.highestPrice - this.lowestPrice) * paddingHeight;
				this.ctx.fillRect(x, closeY, this.barWidth, Math.abs(closeY - openY));
			} else {
				this.ctx.fillStyle = this.fallingColor;
				const closeY = this.padding + (this.highestPrice - closePrice) / (this.highestPrice - this.lowestPrice) * paddingHeight;
				const openY = this.padding + (this.highestPrice - openPrice) / (this.highestPrice - this.lowestPrice) * paddingHeight;
				this.ctx.fillRect(x, openY, this.barWidth, Math.abs(closeY - openY));
			}
		}
	};
}