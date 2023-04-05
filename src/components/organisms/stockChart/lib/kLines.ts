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
		this.barRanges = [];
		this.padding = 60;
		this.draw();
	}

	draw() {
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

	setKLinesConfigure = () => {
		this.highestPrice = this.getHighestPrice();
		this.lowestPrice = this.getLowestPrice();
		this.numBars = this.data.length;
		this.barWidth = this.canvas.width / this.numBars * 0.8;
		this.barSpacing = this.canvas.width / this.numBars * 0.2;
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