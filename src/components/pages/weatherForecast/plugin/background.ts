import { Plugin } from "chart.js";

export const chartBackgroundColorPlugin: Plugin = {
	id: "chartBackgroundColor",
	beforeDraw: (chart, _args, options) => {
		const { ctx } = chart;
		ctx.save();
		ctx.globalCompositeOperation = "destination-over";
		ctx.fillStyle = options.color || "#99ffff";
		ctx.fillRect(0, 0, chart.width, chart.height);
		ctx.restore();
	}
};