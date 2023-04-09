import { BasicCanvas } from "./basicCanvas";
import { KLines } from "./kLines";
import { KLineBarRange } from "./type";
import type { PaletteMode } from "@mui/material";
export class StockChartHeader extends BasicCanvas {
	private foregroundCanvas: HTMLCanvasElement;
	private kLines: KLines;
	private indexWithinRange: number | undefined;
	private priceColor: string;

	constructor(canvas: HTMLCanvasElement, kLines: KLines, foregroundCanvas: HTMLCanvasElement, mode: PaletteMode) {
		super(canvas, mode);
		this.foregroundCanvas = foregroundCanvas;
		this.kLines = kLines;
		this.ctx.strokeStyle = "#000";
		this.ctx.font = "16px Arial";
		this.priceColor = "red";
		this.indexWithinRange = this.kLines.barRanges.length - 1 > 0 ? 
			this.kLines.barRanges.length - 1: undefined;
		this.foregroundCanvas.addEventListener("mousemove", this.handleForegroundMouseMove);
		this.drawText();
	}

	private findIndexWithinRange(x: number, barRanges: KLineBarRange[]): number | undefined {
		// 搜尋 a 中所有元素
		for (let i = 0; i < barRanges.length; i++) {
			// 如果 x 在 a[i] 的範圍內，回傳 a[i]
			if (x >= barRanges[i].range[0] && x <= barRanges[i].range[1]) {
				return i;
			}
		}
		// 若沒有符合條件的元素，回傳 undefined
		return undefined;
	}

	setMode = (mode: PaletteMode) => {
		this.mode = mode;
		this.drawText();
	};

	drawText = () => {
		const { indexWithinRange } = this;
		if (indexWithinRange) {
			this.clear();
			this.ctx.fillStyle = this.mode === "dark" ? "#e3e2e6": "#1b1b1f";
			this.ctx.fillText(this.kLines.data[indexWithinRange][0], 10, 20);
			this.ctx.fillStyle = this.priceColor;
			this.ctx.fillText(this.kLines.data[indexWithinRange][4].toString(), 10, 80);
			this.ctx.fillStyle = this.mode === "dark" ? "#e3e2e6": "#1b1b1f";
			const detail = `開: ${this.kLines.data[indexWithinRange][1]}\
				高: ${this.kLines.data[indexWithinRange][2]}\
				低: ${this.kLines.data[indexWithinRange][3]}\
				收: ${this.kLines.data[indexWithinRange][4]}`;
			this.ctx.fillText(detail, 10, 50);
		}
	};

	handleForegroundMouseMove = (e: MouseEvent) => {
		const rect = this.foregroundCanvas.getBoundingClientRect();
		const x = e.clientX - rect.left; // 計算屬標的x座標
		this.indexWithinRange = this.findIndexWithinRange(x, this.kLines.barRanges);
		const { indexWithinRange } = this;

		if (indexWithinRange) {
			const data = this.kLines.data[indexWithinRange];
			const [,open,,,close] = data;
			this.priceColor = this.getPriceColor(open, close);
		}

		this.drawText();
	};
}