import { Chart } from "../chart";
import { BasicCanvas } from "../charts/basicCanvas";
import { BasicStockChartController } from "../charts/basicStockGraphController";

export class Loading extends BasicCanvas {
	private basicStockChartController: BasicStockChartController;
	private loadingMetrics: TextMetrics;
	chart: Chart;

	constructor(canvas: HTMLCanvasElement, basicStockChartController: BasicStockChartController) {
		super(canvas);
		this.canvas.style.zIndex = "30";
		this.canvas.style.display = "none";
		this.basicStockChartController = basicStockChartController;
		this.ctx.textBaseline = "middle";
		this.ctx.textAlign = "center";
		this.ctx.font = "20px Arial";
		this.loadingMetrics = this.measureTextMetrics("Loading...");
	}

	setMode = () => {
		this.draw();
	};
	
	show = () => {
		this.draw();
	};
	
	drawBgk = () => {
		this.ctx.fillStyle = this.basicStockChartController.mode === "dark" ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.25)";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	};

	drawContainer = () => {
		const { width, actualBoundingBoxAscent, actualBoundingBoxDescent } = this.loadingMetrics;
		const height = actualBoundingBoxAscent + actualBoundingBoxDescent;
		const boxWidth = width + 60;
		const boxHeight = height + 20;
		this.ctx.fillStyle = this.basicStockChartController.mode === "dark" ? "rgba(255, 255, 255)" : "rgba(0, 0, 0)";
		this.ctx.fillRect(this.canvas.width/2 - boxWidth/2, this.canvas.height/2 - boxHeight/2, boxWidth, boxHeight);
	};

	drawText = () => {
		this.ctx.fillStyle = this.basicStockChartController.mode === "dark" ? "rgba(0, 0, 0)" :  "rgba(255, 255, 255)";
		this.ctx.fillText("Loading...", this.canvas.width/2, this.canvas.height/2);
	};

	draw = () => {
		this.clear();
		this.canvas.style.display = "block";
		this.drawBgk();
		this.drawContainer();
		this.drawText();
	};
	
	close = () => {
		this.canvas.style.display = "none";
	};
}