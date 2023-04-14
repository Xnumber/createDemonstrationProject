import { BasicCanvas } from "../charts/basicCanvas";
import { BasicStockChartController } from "../charts/basicStockGraphController";
import { ChartData } from "../type";

export class StockChartHeader extends BasicCanvas {
	private textColor: string;
	private basicStockChartController: BasicStockChartController;
	constructor(canvas: HTMLCanvasElement, basicStockChartController: BasicStockChartController) {
		super(canvas);
		this.basicStockChartController = basicStockChartController;
		this.ctx.fillStyle = this.basicStockChartController.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.textColor = this.basicStockChartController.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.ctx.font = "12px Arial";
		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "middle";
		this.draw();
	}

	setMode = () => {
		this.ctx.fillStyle = this.basicStockChartController.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.textColor = this.basicStockChartController.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.draw();
	};

	drawText = (data: ChartData[number]) => {
		const [date, open, heigh, low, close] = data;
		this.ctx.font = "20px Arial";
		this.ctx.fillText(date, 10, 25);
		this.ctx.fillStyle = this.getPriceColor(open, close);
		const dateMetrics = this.measureTextMetrics(date);
		this.ctx.fillText(`${close.toString()} ${open - close > 0 ? "↓": "↑"}`, dateMetrics.width + 20, 25);
		this.ctx.font = "12px Arial";
		this.ctx.fillStyle = this.textColor;
		const detail = `開: ${open}\
					高: ${heigh}\
					低: ${low}\
					收: ${close}`;
		this.ctx.fillText(detail, 10, 50);
	};

	draw = () => {
		const { mouseXWithinDayIndex, data } = this.basicStockChartController;
		this.clear();
		if (mouseXWithinDayIndex !== undefined) {
			this.drawText(data[mouseXWithinDayIndex]);
		} else {
			this.drawText(data[data.length - 1]);
		}
	};
}