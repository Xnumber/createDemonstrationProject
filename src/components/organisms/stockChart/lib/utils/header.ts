import { BasicCanvas } from "../charts/basicCanvas";
import { BasicStockChartController } from "../charts/basicStockGraphController";

export class StockChartHeader extends BasicCanvas {
	private textColor: string;
	private basicStockChartController: BasicStockChartController;
	constructor(canvas: HTMLCanvasElement, basicStockChartController: BasicStockChartController) {
		super(canvas);
		this.basicStockChartController = basicStockChartController;
		this.textColor = this.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.ctx.fillStyle = this.textColor;
		this.ctx.font = "12px Arial";
		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "middle";
		this.draw();
	}

	setMode = () => {
		this.mode = this.basicStockChartController.mode;
		this.draw();
	};

	draw = () => {
		const { mouseXWithinDayIndex, data } = this.basicStockChartController;

		try {
			if (mouseXWithinDayIndex !== undefined) {
				this.clear();
				const [,open,,,close] = this.basicStockChartController.data[mouseXWithinDayIndex];
				this.ctx.fillStyle = this.mode === "dark" ? "#e3e2e6": "#1b1b1f";
				this.ctx.fillText(data[mouseXWithinDayIndex][0], 10, 25);
				this.ctx.fillStyle = this.getPriceColor(open, close);
				this.ctx.fillText(data[mouseXWithinDayIndex][4].toString(), 75, 25);
				this.ctx.fillStyle = this.mode === "dark" ? "#e3e2e6": "#1b1b1f";
				const detail = `開: ${data[mouseXWithinDayIndex][1]}\
					高: ${data[mouseXWithinDayIndex][2]}\
					低: ${data[mouseXWithinDayIndex][3]}\
					收: ${data[mouseXWithinDayIndex][4]}`;
				this.ctx.fillText(detail, 10, 50);
			}
		} catch (e) {
			console.warn("range",this.basicStockChartController.barRanges);
			console.warn(this.basicStockChartController.data);
			console.warn(mouseXWithinDayIndex);
		}
	};
}