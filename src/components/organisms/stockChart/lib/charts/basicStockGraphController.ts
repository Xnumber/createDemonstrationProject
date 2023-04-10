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

	// for drag
	private dragStartX: number;
	private movingIndex: number; // moved indexes in one drag

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
		this.dragStartX;
		this.movingIndex = 0;
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
	
	handleScroll = (e: WheelEvent) => {
		// 防止滾動事件的預設行為
		e.preventDefault();
		// // 獲取滾動的方向以及滾動量
		// const deltaY = event.movementY;
		// const deltaY = event.deltaY;
		const moved = e.deltaY > 0 ? 10 : -10;
		// // 在此處實現處理滾動事件的程式碼
		if (this.data.length > 20 || moved < 0) {
			this.currentRange = [this.currentRange[0] + moved, this.currentRange[1]];
			this.data = this.getRangeData(this.currentRange[0], this.currentRange[1], this.parsedRawData);
			this.setKLinesConfigure();
			// // 重繪 Canvas
			// this.draw();
		}
	};

	handleMouseDown = (e: MouseEvent) => {
		// 當mousedown事件被觸發時，執行此回調函數
		// 獲取滑鼠按下時的位置
		this.dragStartX = e.clientX;
		// 當滑鼠按下時，設置mousemove事件監聽器
		document.addEventListener("mousemove", this.handleMouseMove);
		// 當滑鼠放開時，移除mousemove事件監聽器
		document.addEventListener("mouseup", this.handleMouseUp);
	};

	handleMouseUp = () => {
		this.currentRange = [this.currentRange[0] - this.movingIndex, this.currentRange[1] - this.movingIndex];
		// reset after every drag, or it could affect next drag
		this.movingIndex = 0;
		// 當滑鼠放開時，移除mousemove事件監聽器
		document.removeEventListener("mousemove", this.handleMouseMove);
		// 移除mouseup事件監聽器
		document.removeEventListener("mouseup", this.handleMouseUp);
	};

	handleMouseMove = (event: MouseEvent) => {
		const { currentRange, parsedRawData } = this;
		// 獲取滑鼠移動時的位置
		const x = event.clientX;
		// 計算滑鼠移動的距離
		const movingIndex = Math.floor((x - this.dragStartX)/5);
		// check range that is not over the latest date
		if (currentRange[1] - movingIndex < parsedRawData.length - 1) {
			this.movingIndex = movingIndex;
			this.data = this.getRangeData(currentRange[0] - movingIndex, currentRange[1] - movingIndex, parsedRawData);
			this.setKLinesConfigure();
		}
		// if the changed range is over the latest date, set the ranges to the latest date
		if (currentRange[1] - movingIndex >= parsedRawData.length - 1 && movingIndex < 0) {
			this.data = this.getRangeData(currentRange[0], parsedRawData.length - 1, parsedRawData);
			this.setKLinesConfigure();
		}
		
	};

	setKLinesConfigure = () => {
		this.highestPrice = this.getHighestPrice();
		this.lowestPrice = this.getLowestPrice();
		this.numBars = this.data.length;
		this.barWidth = this.size.width / this.numBars * 0.8;
		this.barSpacing = this.size.width / this.numBars * 0.2;
	};
}