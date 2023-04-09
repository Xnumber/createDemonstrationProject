import { BasicCanvas } from "./basicCanvas";
import { ChartData, StockRawData } from "./type";
import type { PaletteMode } from "@mui/material";

export class BasicChart extends BasicCanvas {
	protected parsedRawData: ChartData;
	protected currentRange: [number, number];
	protected barWidth: number;
	protected barSpacing: number;
	protected numBars: number;
	protected data: ChartData;
	protected highestPrice: number;
	protected lowestPrice: number;

	constructor(canvas: HTMLCanvasElement, data: StockRawData, mode: PaletteMode) {
		super(canvas, mode);
		this.currentRange = [data.length - 30, data.length - 1];
		this.parsedRawData = this.parseData(data);
		this.data = this.getRangeData(this.currentRange[0], this.currentRange[1], this.parsedRawData);
		this.numBars = this.data.length;
		this.barWidth = this.canvas.width / this.numBars * 0.8;
		this.barSpacing = this.canvas.width / this.numBars * 0.2;
		this.highestPrice = this.getHighestPrice();
		this.lowestPrice = this.getLowestPrice();
	}

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

	getRangeData = (startIndex: number, endIndex: number, data: ChartData) => {
		return data.slice(startIndex, endIndex + 1);
	};

	getHighestPrice = () => {
		const highPrices = this.data.map(item => item[2]);
		return Math.max(...highPrices);
	};

	getLowestPrice = () => {
		const lowPrices = this.data.map(item => item[3]);
		return Math.min(...lowPrices);
	};
}