import { BasicCanvas } from "../basicCanvas";
import { BasicStockChartController } from "../charts/basicStockGraphController";
import type { PaletteMode } from "@mui/material";

export class XAxis extends BasicCanvas {
	private axisLabelColor: string;
	private basicStockChartController: BasicStockChartController;
	constructor(canvas: HTMLCanvasElement, basicStockChartController: BasicStockChartController, mode: PaletteMode) {
		super(canvas, mode);
		this.basicStockChartController = basicStockChartController;
		this.axisLabelColor = this.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.ctx.fillStyle = this.axisLabelColor;
		this.ctx.font = "12px Arial";
		this.ctx.textAlign = "center";
		this.draw();
	}

	draw() {
		this.clear();
		this.drawXAxis();
	}
	
	drawXAxis = () => {
		const { barWidth, barSpacing, data, xAxisShownIndexArray } = this.basicStockChartController;
		const labelSpacing = 5;  // 日期標籤之間的間距
		for (let i = 0; i < data.length; i++) {
			const labelX = i * (barWidth + barSpacing) + barWidth / 2;
			const labelDate = data[i][0];
			if (xAxisShownIndexArray.indexOf(i) !== -1) {
				this.ctx.fillText(labelDate, labelX, this.canvas.height - labelSpacing);
			}
		}
	};
	
	setMode = () => {
		this.ctx.fillStyle = this.basicStockChartController.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.draw();
	};
}