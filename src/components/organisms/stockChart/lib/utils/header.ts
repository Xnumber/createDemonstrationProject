import { BasicCanvas } from "../charts/basicCanvas";
import { BasicStockChartController } from "../charts/basicStockGraphController";
import { ChartData } from "../type";

export class StockChartHeader extends BasicCanvas {
	private textColor: string;
	private basicStockChartController: BasicStockChartController;
	private dateMetrics: TextMetrics;
	private arrowSize: number;
	private halfArrowSize: number;
	private doubleArrowSize: number;

	constructor(canvas: HTMLCanvasElement, basicStockChartController: BasicStockChartController) {
		super(canvas);
		this.basicStockChartController = basicStockChartController;
		this.ctx.fillStyle = this.basicStockChartController.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.textColor = this.basicStockChartController.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.ctx.font = "20px Arial";
		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "middle";
		this.arrowSize = 10;
		this.halfArrowSize = this.arrowSize/2;
		this.doubleArrowSize = this.arrowSize*2;
		this.dateMetrics = this.measureTextMetrics(this.basicStockChartController.data[0][0]);
		this.draw();
	}

	setMode = () => {
		this.ctx.fillStyle = this.basicStockChartController.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.textColor = this.basicStockChartController.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.draw();
	};

	drawArrow = (gainOrLost: boolean, x: number, y: number) => {
		if (gainOrLost) {
			this.drawUpArrow(x, y);
		} else {
			this.drawDownArrow(x, y);
		}
	};

	drawUpArrow = (x: number, y: number) => {
		const arrowPath = new Path2D();
		const { arrowSize, ctx, halfArrowSize, doubleArrowSize } = this;
		const startX = x - halfArrowSize;
		const startY = y + doubleArrowSize;
		const xMoved = arrowSize;
		const yMoved = -arrowSize;
		ctx.fillStyle = "red";
		arrowPath.moveTo(startX , startY);
		arrowPath.lineTo(startX + xMoved, startY);
		arrowPath.lineTo(startX + xMoved, startY + yMoved);
		arrowPath.lineTo(startX + 3*xMoved / 2, startY + yMoved);
		arrowPath.lineTo(startX + xMoved / 2, startY + 2 * yMoved);
		arrowPath.lineTo(startX - xMoved / 2, startY + yMoved);
		arrowPath.lineTo(startX , startY + yMoved);
		arrowPath.closePath();
		ctx.fill(arrowPath);
	};

	drawDownArrow = (x: number, y: number) => {
		const arrowPath = new Path2D();
		const { arrowSize, ctx, halfArrowSize } = this;
		const startX = x + halfArrowSize;
		const startY = y;
		const xMoved = -arrowSize;
		const yMoved = arrowSize;
		ctx.fillStyle = "green";
		arrowPath.moveTo(startX , startY);
		arrowPath.lineTo(startX + xMoved, startY);
		arrowPath.lineTo(startX + xMoved, startY + yMoved);
		arrowPath.lineTo(startX + 3*xMoved / 2, startY + yMoved);
		arrowPath.lineTo(startX + xMoved / 2, startY + 2 * yMoved);
		arrowPath.lineTo(startX - xMoved / 2, startY + yMoved);
		arrowPath.lineTo(startX , startY + yMoved);
		arrowPath.closePath();
		ctx.fill(arrowPath);
	};

	drawDetail = (data: ChartData[number]) => {
		this.ctx.font = "12px Arial";
		this.ctx.fillStyle = this.textColor;
		const [, open, heigh, low, close] = data;
		const detail = `開: ${open}\
					高: ${heigh}\
					低: ${low}\
					收: ${close}`;
		this.ctx.fillText(detail, 10, 50);
	};

	drawCurrent = (data: ChartData[number], x: number, y: number) => {
		const [date, open, , , close] = data;
		this.ctx.fillStyle = this.textColor;
		this.ctx.font = "20px Arial";
		this.ctx.fillText(date, 10, 25);
		this.ctx.fillStyle = this.getPriceColor(open, close);
		this.ctx.fillText(`${close.toString()}`, x, y);
	};

	draw = () => {
		const { mouseXWithinDayIndex, data } = this.basicStockChartController;
		this.clear();
		const currentData = mouseXWithinDayIndex ? data[mouseXWithinDayIndex]: data[data.length - 1];
		const [, open, , , close] = currentData;
		this.ctx.font = "20px Arial";
		const closeMetrics = this.measureTextMetrics(close.toString());
		const gainOrLost = this.gainOrLoss(open, close);
		
		if (mouseXWithinDayIndex !== undefined) {
			this.drawCurrent(data[mouseXWithinDayIndex], this.dateMetrics.width + 20, 25);
			this.drawDetail(data[mouseXWithinDayIndex]);
			this.drawArrow(gainOrLost, closeMetrics.width + this.dateMetrics.width + 35, 15);
		} else {
			this.drawCurrent(data[data.length - 1], this.dateMetrics.width + 20, 25);
			this.drawDetail(data[data.length - 1]);
			this.drawArrow(gainOrLost, closeMetrics.width + this.dateMetrics.width + 35, 15);
		}
	};
}