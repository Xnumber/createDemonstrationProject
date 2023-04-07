import { BasicCanvas } from "./basic";
import { KLines } from "./kLines";
import type { PaletteMode } from "@mui/material";
import { ChartData } from "./type";
export class MovingAerage extends BasicCanvas {
	private foregroundCanvas: HTMLCanvasElement;
	private kLines: KLines;
	private maData: (number | null)[];

	constructor(canvas: HTMLCanvasElement, kLines: KLines, foregroundCanvas: HTMLCanvasElement, mode: PaletteMode) {
		super(canvas, mode);
		this.foregroundCanvas = foregroundCanvas;
		this.kLines = kLines;
		this.ctx.strokeStyle = "red";
		this.foregroundCanvas.addEventListener("wheel", this.handleForegroundMouseMove);
		this.foregroundCanvas.addEventListener("mousemove", this.handleForegroundMouseMove);
		this.maData = this.getMovingAverageData(20, this.kLines.data);
		this.drawLines();
	}

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

	setMode = (mode: PaletteMode) => {
		this.mode = mode;
	};

	handleForegroundMouseMove = () => {
		this.clear();
		this.maData = this.getMovingAverageData(20, this.kLines.data);
		this.drawLines();
	};

	drawLines = () => {
		const drawingRangeHeight = this.canvas.height - 2*this.padding;
		const { highestPrice, lowestPrice, barWidth, barSpacing } = this.kLines;
		
		this.ctx.beginPath();
		
		for (let i = 0; i < this.maData.length; i++) {
			const item = this.maData[i];
			const x = barWidth/2 + i * (barWidth + barSpacing);

			if (item) {
				const y = (highestPrice - item) / (highestPrice - lowestPrice) * drawingRangeHeight + this.padding;
				this.ctx.lineTo(x, y);
			}
		}

		this.ctx.stroke();
	};

	destroy = () => {
		this.foregroundCanvas.removeEventListener("mousemove", this.handleForegroundMouseMove);
		this.foregroundCanvas.removeEventListener("wheel", this.handleForegroundMouseMove);
	};
}