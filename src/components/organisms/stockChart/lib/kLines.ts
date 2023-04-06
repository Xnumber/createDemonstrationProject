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
	private xAxisShownIndexArray: number[];

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

		this.barRanges = [];
		this.padding = 60;
		this.draw();
	}

	draw() {
		this.drawXGrid();
		this.drawXLabels();
		this.drawKLines();
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