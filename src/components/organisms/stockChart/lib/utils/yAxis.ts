import { BasicCanvas } from "../basicCanvas";
import { BasicStockChartController } from "../charts/basicStockGraphController";
import type { PaletteMode } from "@mui/material";

export class YAxis extends BasicCanvas {
	private axisLabelColor: string;
	private basicStockChartController: BasicStockChartController;
	constructor(canvas: HTMLCanvasElement, basicStockChartController: BasicStockChartController, mode: PaletteMode) {
		super(canvas, mode);
		this.basicStockChartController = basicStockChartController;
		this.axisLabelColor = this.basicStockChartController.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.ctx.font = "12px Arial";
		this.ctx.textAlign = "right";
		this.ctx.textBaseline = "middle";
		this.ctx.fillStyle = this.axisLabelColor;
		this.draw();
	}

	draw() {
		this.clear();
		this.drawYAxis();
	}

	drawYAxis = () => {
		const { lowestPrice, highestPrice, priceInterval, priceHeight } = this.basicStockChartController;
		const roundedLowestPrice = Math.floor(lowestPrice/100)*100;
		for (let i = roundedLowestPrice; i <= highestPrice; i += priceInterval) {
			const y = this.canvas.height - this.padding - (i - lowestPrice) * priceHeight;
			const x = this.canvas.width;
			this.ctx.fillText(i.toFixed(2), x - 10, y);
		}
	};

	setMode = () => {
		this.ctx.fillStyle = this.basicStockChartController.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.draw();
	};
}