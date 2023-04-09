import { BasicCanvas } from "./basicCanvas";
import { KLines } from "./kLines";
import type { PaletteMode } from "@mui/material";
import { ChartData, MAConfigure } from "./type";

export class MovingAerage extends BasicCanvas {
	private foregroundCanvas: HTMLCanvasElement;
	private kLines: KLines;
	private maData: (number | null)[][];
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
	public maTypesChosen = 1;

	constructor(canvas: HTMLCanvasElement, kLines: KLines, foregroundCanvas: HTMLCanvasElement, mode: PaletteMode) {
		super(canvas, mode);
		this.foregroundCanvas = foregroundCanvas;
		this.kLines = kLines;
		this.ctx.strokeStyle = "red";
		this.foregroundCanvas.addEventListener("wheel", this.handleForegroundMouseMove);
		this.foregroundCanvas.addEventListener("mousemove", this.handleForegroundMouseMove);
		this.maData = this.getChosenMAData();
		this.drawLines();
	}

	setMaTypesChosen = (maTypesChosen: number) => {
		this.maTypesChosen = maTypesChosen;
		this.maData = this.getChosenMAData();
		this.drawLines();
	};
	
	setMADay = (index: number, value: number) => {
		this.mAConfigure[index].day = value;
		this.maData = this.getChosenMAData();
		this.clear();
		this.drawLines();
	};
	
	setMAColor = (index: number, value: string) => {
		this.mAConfigure[index].color = value;
		this.clear();
		this.drawLines();
	};

	getChosenMAData = () => {
		const { mAConfigure, getMovingAverageData } = this;
		const chosenMAData = [];
		for (let index = 0; index < this.maTypesChosen; index++) {
			const maData = getMovingAverageData(mAConfigure[index].day, this.kLines.data);
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
		this.drawLines();
	};

	drawLines = () => {
		const drawingRangeHeight = this.canvas.height - 2*this.padding;
		const { highestPrice, lowestPrice, barWidth, barSpacing } = this.kLines;
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