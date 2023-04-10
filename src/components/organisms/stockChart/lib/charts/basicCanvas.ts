import type { PaletteMode } from "@mui/material";

export abstract class BasicCanvas {
	public ctx: CanvasRenderingContext2D;
	public canvas: HTMLCanvasElement;
	public mode: PaletteMode;
	public padding: number;
	
	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
		this.padding = 60;
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	destroy = () => {
		this.canvas.replaceWith(this.canvas.cloneNode(true));
	};

	gainOrLoss(open: number, close: number): boolean {
		return close > open;
	}

	getPriceColor(open: number, close: number): string {
		if (open > close) {
			return "green";
		} else {
			return "red";
		}
	}

	abstract draw(): void
}
