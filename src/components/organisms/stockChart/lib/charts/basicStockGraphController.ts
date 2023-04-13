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
	public priceInterval: number;
	public xAxisShownIndexArray: number[];
	public priceHeight: number;
	// for drag
	private dragStartX: number;
	private movingIndex: number; // moved indexes in one drag

	public mouseXWithinDayIndex: number | undefined;
	public mouseX: number;
	public mouseY: number;

	constructor(size: { width: number, height: number }, data: StockRawData, mode: PaletteMode) {
		this.mode = mode;
		this.padding = 60;
		this.mouseX;
		this.mouseY;
		this.mouseXWithinDayIndex;
		this.currentRange = [data.length - 30, data.length - 1];
		this.parsedRawData = this.parseData(data);
		this.data = this.getRangeData(this.currentRange[0], this.currentRange[1], this.parsedRawData);
		this.numBars = this.data.length;
		this.barWidth = size.width / this.numBars * 0.8;
		this.barSpacing = size.width / this.numBars * 0.2;
		this.size = size;
		this.highestPrice = this.getHighestPrice();
		this.lowestPrice = this.getLowestPrice();
		this.setBarRanges();
		this.dragStartX;
		this.movingIndex = 0;
		this.priceInterval = this.getPriceInterval(this.highestPrice, this.lowestPrice, 5);
		this.xAxisShownIndexArray = this.getXAxisShownIndexArray(this.data);
		this.priceHeight = (this.size.height - this.padding * 2) / (this.highestPrice - this.lowestPrice);
	}

	updateMouseStatus = (x?: number, y?: number) => {
		if (x) {
			this.mouseX = x;
		}
		
		if (y) {
			this.mouseY = y;
		}
		const mouseXWithinDayIndex = this.findMouseXWithinDayIndex(this.mouseX);
		this.mouseXWithinDayIndex = mouseXWithinDayIndex !== undefined ? mouseXWithinDayIndex: this.mouseXWithinDayIndex;
	};

	findMouseXWithinDayIndex = (x: number | undefined): number | undefined => {
		const { barRanges } = this;
		if (x) {
			// 搜尋 a 中所有元素
			for (let i = 0; i < barRanges.length; i++) {
				// 如果 x 在 a[i] 的範圍內，回傳 a[i]
				if (x >= barRanges[i].range[0] && x <= barRanges[i].range[1]) {
					return i;
				}

				if (barRanges[i + 1] === undefined) {
					return i;
				}

				if (x >= barRanges[i].range[1] && x <= barRanges[i + 1].range[0]) {
					return i;
				}
			}
		}
		// 若沒有符合條件的元素，回傳 undefined
		return undefined;
	};
	
	setMouseXWithinDayIndex = (event: MouseEvent) => {
		const rect = (event.currentTarget as HTMLCanvasElement).getBoundingClientRect();
		const x = event.clientX - rect.left; // 計算屬標的x座標
		const mouseXWithinDayIndex =this.findMouseXWithinDayIndex(x);
		this.mouseXWithinDayIndex = mouseXWithinDayIndex ? mouseXWithinDayIndex: this.mouseXWithinDayIndex;
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

	setBarRanges = () => {
		this.barRanges = [];
		for (let i = 0; i < this.data.length; i++) {
			const x = i * (this.barWidth + this.barSpacing);
			this.barRanges.push({
				range: [x, x + this.barWidth],
				data: this.data[i]
			});
		}
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

	getPriceInterval = (max: number, min: number, n: number) => {
		const range = max - min;
		const rawInterval = range / n;
		const magnitude = Math.floor(Math.log10(rawInterval));
		const scale = Math.pow(10, magnitude);
		const interval = Math.ceil(rawInterval / scale) * scale;
		return interval;
	};

	handleScroll = (e: WheelEvent) => {
		// 防止滾動事件的預設行為
		e.preventDefault();
		const moved = e.deltaY > 0 ? 10 : -10;
		// // 在此處實現處理滾動事件的程式碼
		if (this.data.length - moved > 10) {
			this.currentRange = [this.currentRange[0] + moved, this.currentRange[1]];
			this.data = this.getRangeData(this.currentRange[0], this.currentRange[1], this.parsedRawData);
			this.setBasicGraphConfigure();
		} else if(moved > 0){
			this.currentRange = [this.currentRange[1] - 10, this.currentRange[1]];
			this.data = this.getRangeData(this.currentRange[0], this.currentRange[1], this.parsedRawData);
			this.setBasicGraphConfigure();
		}
	};

	handleMouseDown = (e: MouseEvent) => {
		// 當mousedown事件被觸發時，執行此回調函數
		// 獲取滑鼠按下時的位置
		this.dragStartX = e.clientX;
		// 當滑鼠按下時，設置mousemove事件監聽器
		document.addEventListener("mousemove", this.handleDragMove);
		// 當滑鼠放開時，移除mousemove事件監聽器
		document.addEventListener("mouseup", this.handleMouseUp);
	};

	handleMouseUp = () => {
		this.currentRange = [this.currentRange[0] - this.movingIndex, this.currentRange[1] - this.movingIndex];
		// reset after every drag, or it could affect next drag
		this.movingIndex = 0;
		// 當滑鼠放開時，移除mousemove事件監聽器
		document.removeEventListener("mousemove", this.handleDragMove);
		// 移除mouseup事件監聽器
		document.removeEventListener("mouseup", this.handleMouseUp);
	};

	handleDragMove = (event: MouseEvent) => {
		const { currentRange, parsedRawData } = this;
		// 獲取滑鼠移動時的位置
		const x = event.clientX;
		// 計算滑鼠移動的距離
		const movingIndex = Math.floor((x - this.dragStartX)/5);
		// check range that is not over the latest date
		if (currentRange[1] - movingIndex < parsedRawData.length - 1) {
			this.movingIndex = movingIndex;
			this.data = this.getRangeData(currentRange[0] - movingIndex, currentRange[1] - movingIndex, parsedRawData);
			this.setBasicGraphConfigure();
		}
		// if the changed range is over the latest date, set the ranges to the latest date
		if (currentRange[1] - movingIndex >= parsedRawData.length - 1 && movingIndex < 0) {
			this.data = this.getRangeData(currentRange[0], parsedRawData.length - 1, parsedRawData);
			this.setBasicGraphConfigure();
		}
		
	};

	setBasicGraphConfigure = () => {
		this.highestPrice = this.getHighestPrice();
		this.lowestPrice = this.getLowestPrice();
		this.numBars = this.data.length;
		this.barWidth = this.size.width / this.numBars * 0.8;
		this.barSpacing = this.size.width / this.numBars * 0.2;
		this.priceInterval = this.getPriceInterval(this.highestPrice, this.lowestPrice, 5);
		this.xAxisShownIndexArray = this.getXAxisShownIndexArray(this.data);
		this.priceHeight = (this.size.height - this.padding * 2) / (this.highestPrice - this.lowestPrice);
		this.setBarRanges();
		this.updateMouseStatus();
	};

	setMode = (mode: PaletteMode) => {
		this.mode = mode;
	};
}