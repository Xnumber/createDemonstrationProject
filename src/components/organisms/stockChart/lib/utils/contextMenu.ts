import { Chart } from "../chart";
import { BasicCanvas } from "../charts/basicCanvas";
import { BasicStockChartController } from "../charts/basicStockGraphController";
import { StockGraphLibName } from "../type";

export class ContextMenu extends BasicCanvas {
	private basicStockChartController: BasicStockChartController;
	private contextMenuPath: Path2D;
	x: number;
	y: number;
	private menu: {
		label: string;
		path: Path2D | null;
		mouseIn: boolean;
		callback: () => void;
	}[];
	chart: Chart;

	constructor(canvas: HTMLCanvasElement, basicStockChartController: BasicStockChartController, chart: Chart) {
		super(canvas);
		this.ctx.textBaseline = "middle";
		this.ctx.font = "20px Arial";
		this.basicStockChartController = basicStockChartController;
		this.contextMenuPath;
		this.chart = chart;
		this.canvas.addEventListener("click", this.onContextMenuClick);
		this.canvas.addEventListener("mousemove", this.handleMouseMove);
		this.menu = [
			{
				label: "Line",
				path: null,
				mouseIn: false,
				callback: () => {
					this.handleToggleGraph("Line");
				},
			},
			{
				label: "KLines",
				path: null,
				mouseIn: false,
				callback: () => {
					this.handleToggleGraph("KLines");
				},
			},
			{
				label: "MovingAverage",
				path: null,
				mouseIn: false,
				callback: () => {
					this.handleToggleGraph("MovingAverage");
				},
			},
		];
	}

	handleToggleGraph = async (graphName: StockGraphLibName) => {
		this.chart.loading.draw();
		await this.chart.toggleGraph(graphName);
		this.draw();
		this.chart.loading.close();
	};

	setMode = () => {
		this.ctx.fillStyle = this.basicStockChartController.mode === "dark" ? "#e3e2e6": "#1b1b1f";
		this.draw();
	};

	setMenuConfigure = () => {
		const { mouseX: x, mouseY: y } = this.basicStockChartController;
		this.x = x > this.canvas.width - 200 ? x - 200: x;
		this.y = y > this.canvas.height - 200 ? y - 120: y;
		const ContextMenuPath = new Path2D();
		ContextMenuPath.rect(this.x, this.y, 200, 120);
		this.contextMenuPath = ContextMenuPath;
		this.menu.forEach((m, i) => {
			const path = new Path2D();
			path.rect(this.x + 25, this.y + 15 + i*30, 160, 30);
			m.path = path;
		});
	};

	handleMouseMove = (e: MouseEvent) => {
		const x = e.clientX - (e.currentTarget as HTMLCanvasElement).getBoundingClientRect().left;
		const y = e.clientY - (e.currentTarget as HTMLCanvasElement).getBoundingClientRect().top;
		this.basicStockChartController.updateMouseStatus(x, y);
		const originMouseInIndex = this.menu.findIndex(m => m.mouseIn);
		let currentMouseIndex: number;
		this.menu.forEach((m, i) => {
			if (this.ctx.isPointInPath(m.path as Path2D, x, y)) {
				m.mouseIn = true;
				currentMouseIndex = i;
			}
			
			if (!this.ctx.isPointInPath(m.path as Path2D, x, y)) {
				m.mouseIn = false;
			}

			if (currentMouseIndex !== originMouseInIndex) {
				this.draw();
			}
		});
	};

	onContextMenuClick = () => {
		const { mouseX: x, mouseY: y } = this.basicStockChartController;
		if (!this.ctx.isPointInPath(this.contextMenuPath, x, y)) {
			this.clear();
			this.canvas.style.display = "none";
		}

		const menuIndex = this.menu.findIndex(m => m.mouseIn);
		if (menuIndex !== -1) {
			this.menu[menuIndex].callback();
		}
	};
	
	drawMark = (x: number, y: number, size: number, color: string) => {
		const { ctx } = this;
		ctx.beginPath();
		ctx.moveTo(x - size, y + size);
		ctx.lineTo(x, y + (2 * size));
		ctx.lineTo(x + (2 * size), y - size);
		ctx.lineWidth = size / 5;
		ctx.strokeStyle = color;
		ctx.lineWidth = 2;
		ctx.stroke();
	};

	draw = () => {
		const { ctx } = this;
		this.clear();
		this.canvas.style.display = "block";
		ctx.fillStyle = "#fff";
		ctx.stroke(this.contextMenuPath);
		ctx.fill(this.contextMenuPath);
		
		this.menu.forEach((m, i) => {
			ctx.fillStyle = m.mouseIn ? "#000": "#fff";
			ctx.fill(m.path as Path2D);
			ctx.fillStyle = m.mouseIn ? "#fff": "#000";
			if (this.chart.graphs.find(g => g.name === m.label)?.graph) {
				this.drawMark(this.x + 10, this.y + i*30 + 25, 5, "black");
			}
			ctx.fillText(m.label, this.x + 30, this.y + i*30 + 30);
		});
	};

	show = () => {
		this.setMenuConfigure();
		this.draw();
	};
}