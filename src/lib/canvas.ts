export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
	ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
};