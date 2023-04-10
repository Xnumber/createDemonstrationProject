import { BasicCanvas } from "./basicCanvas";
// import { KLines } from "./kLines";
import type { PaletteMode } from "@mui/material";
import { ChartData, MAConfigure } from "../type";
import { BasicStockChartController } from "./basicStockGraphController";

export class MovingAerage extends BasicCanvas {
	// private foregroundCanvas: HTMLCanvasElement;
	private maData: (number | null)[][];
	public basicChartController: BasicStockChartController;
	private mAConfigure: MAConfigure[] = [
		{
			day: 5,
			color: "aqua",
			display: false
		},
		{
			day: 10,
			color: "blue",
			display: false
		},
		{
			day: 20,
			color: "lightblue",
			display: false
		},
		{
			day: 60,
			color: "green",
			display: false
		},
		{
			day: 120,
			color: "brown",
			display: false
		},
		{
			day: 240,
			color: "red",
			display: false
		},
	];
	public maTypesChosen = 2;

	constructor(canvas: HTMLCanvasElement, basicChartController: BasicStockChartController) {
		super(canvas);
		this.basicChartController = basicChartController;
		this.maData = this.getChosenMAData();
		this.draw();
	}

	setMaTypesChosen = (maTypesChosen: number) => {
		this.maTypesChosen = maTypesChosen;
		this.maData = this.getChosenMAData();
		this.draw();
	};
	
	setMADay = (index: number, value: number) => {
		this.mAConfigure[index].day = value;
		this.maData = this.getChosenMAData();
		this.clear();
		this.draw();
	};
	
	setMAColor = (index: number, value: string) => {
		this.mAConfigure[index].color = value;
		this.clear();
		this.draw();
	};

	getChosenMAData = () => {
		const { mAConfigure, getMovingAverageData } = this;
		const chosenMAData = [];
		for (let index = 0; index < this.maTypesChosen; index++) {
			const maData = getMovingAverageData(mAConfigure[index].day, this.basicChartController.data);
			chosenMAData.push(maData);
		}
		return chosenMAData;
	};

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
		this.maData = this.getChosenMAData();
		this.draw();
	};
	
	draw = () => {
		this.clear();
		this.maData = this.getChosenMAData();
		this.drawMovingAverages();
	};

	drawMovingAverages = () => {
		const drawingRangeHeight = this.canvas.height - 2*this.padding;
		const { highestPrice, lowestPrice, barWidth, barSpacing } = this.basicChartController;
		const { ctx, maData, mAConfigure: defaultMAConfigure } = this;
		for (let i = 0; i < maData.length; i++) {
			const oneMaData = maData[i];
			ctx.beginPath();
			ctx.strokeStyle = defaultMAConfigure[i].color;
			oneMaData.forEach((maValue, maIndex) => {
				const x = barWidth/2 + maIndex * (barWidth + barSpacing);
				if (maValue) {
					const y = (highestPrice - maValue) / (highestPrice - lowestPrice) * drawingRangeHeight + this.padding;
					this.ctx.lineTo(x, y);
				}
			});
			this.ctx.stroke();
		}
	};
}