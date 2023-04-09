import { ChartData, KLineBarRange, StockRawData } from "../type";
import type { PaletteMode } from "@mui/material";

export class BasicStockChartController {
	public parsedRawData: ChartData;
	public currentRange: [number, number];
	public barWidth: number;
	public barSpacing: number;
	public numBars: number;
	public data: ChartData;
	public highestPrice: number;
	public lowestPrice: number;
	public mode: PaletteMode;
	public padding: number;
	public size: { width: number, height: number };
	public barRanges: KLineBarRange[];

	constructor(size: { width: number, height: number }, data: StockRawData, mode: PaletteMode) {
		this.mode = mode;
		this.padding = 60;
		this.currentRange = [data.length - 30, data.length - 1];
		this.parsedRawData = this.parseData(data);
		this.data = this.getRangeData(this.currentRange[0], this.currentRange[1], this.parsedRawData);
		this.numBars = this.data.length;
		this.barWidth = size.width / this.numBars * 0.8;
		this.barSpacing = size.width / this.numBars * 0.2;
		this.size = size;
		this.highestPrice = this.getHighestPrice();
		this.lowestPrice = this.getLowestPrice();
		this.barRanges = [];
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
	
	setKLinesConfigure = () => {
		this.highestPrice = this.getHighestPrice();
		this.lowestPrice = this.getLowestPrice();
		this.numBars = this.data.length;
		this.barWidth = this.size.width / this.numBars * 0.8;
		this.barSpacing = this.size.width / this.numBars * 0.2;
	};
}