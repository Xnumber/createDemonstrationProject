import type { PaletteMode } from "@mui/material";
import { BasicStockChartController } from "./basicStockGraphController";
import { BasicCanvas } from "./basicCanvas";

export class Grid extends BasicCanvas {
	public basicChartController: BasicStockChartController;
	constructor(canvas: HTMLCanvasElement, basicChartController: BasicStockChartController) {
		super(canvas);
		this.basicChartController = basicChartController;
		this.ctx.strokeStyle = this.basicChartController.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.draw();
	}

	draw() {
		this.clear();
		this.drawXGrid();
		this.drawYGrid();
	}

	drawXGrid = () => {
		const {  data, barWidth, barSpacing, xAxisShownIndexArray } = this.basicChartController;
		const { ctx } = this;
		for (let i = 0; i < data.length; i++) {
			const labelX = i * (barWidth + barSpacing) + barWidth / 2;
			if (xAxisShownIndexArray.indexOf(i) !== -1) {
				ctx.beginPath();
				ctx.moveTo(labelX, this.canvas.height);
				ctx.lineTo(labelX, 0);
				ctx.stroke();
			}
		}
	};
	
	drawYGrid = () => {
		const { lowestPrice, priceInterval, highestPrice, priceHeight } = this.basicChartController;
		const roundedLowestPrice = Math.floor(lowestPrice/100)*100;
		for (let i = roundedLowestPrice; i <= highestPrice; i += priceInterval) {
			const y = this.canvas.height - this.padding - (i - lowestPrice) * priceHeight;
			const x = this.canvas.width;
			this.ctx.beginPath();
			this.ctx.moveTo(x, y);
			this.ctx.lineTo(0, y);
			this.ctx.stroke();
		}
	};

	setMode = (mode: PaletteMode) => {
		this.mode = mode;
		this.ctx.strokeStyle = this.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.draw();
	};
}