export class BasicCanvas {
	protected ctx: CanvasRenderingContext2D;
	protected canvas: HTMLCanvasElement;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

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
}
