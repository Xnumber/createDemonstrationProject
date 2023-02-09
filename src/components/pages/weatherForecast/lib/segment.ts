import { WeatherDataset, WeatherTag, WeatherLineOptionSegmentStyle } from "../typing";
import type { ScriptableLineSegmentContext } from "chart.js";
export function getWeatherLineOptionSegmentStyle(tags: WeatherTag, datasets: WeatherDataset): WeatherLineOptionSegmentStyle {
	const upTrands = datasets.map(dataset => {
		return dataset.data.map((o, i, a) => {
			return Number(o.y) < Number(a[i + 1]?.y);
		});
	});

	const downTrands = datasets.map(dataset => {
		return dataset.data.map((o, i, a) => {
			return Number(o.y) > Number(a[i + 1]?.y);
		});
	});

	return {
		up: {
			borderColor: (ctx: ScriptableLineSegmentContext) => tags.includes("down") ? upAndDownSegmentBorderColor(ctx, "rgb(192,75,75)", "blue"): upSegmentBorderColor(ctx, "rgb(192,75,75)")
		},
		down: {
			borderColor: (ctx: ScriptableLineSegmentContext) =>  tags.includes("up") ? upAndDownSegmentBorderColor(ctx, "rgb(192,75,75)", "blue"): downSegmentBorderColor(ctx, "blue")
		},
		"overlap of uptrends": {
			isOverlap: false,
			upTrands: upTrands,
			downTrands: downTrands,
			backgroundColor: tags.includes("overlap of downTrends") ? upAndDownTrandOverlapBackgroundColor :(ctx , option: { upTrands: boolean[][] }) => {
				const { upTrands } = option;
				const { datasetIndex, p0DataIndex } = ctx;
				let isOverlap = true;
				
				if (upTrands[datasetIndex][p0DataIndex]) {
					upTrands.forEach(upTrand => {
						if (upTrand[p0DataIndex] === false) {
							isOverlap = false;
						}
					});
				} else {
					isOverlap = false;
				}
				
				if (isOverlap) {
					return "black";
				} else {
					return undefined;
				}
			},
		},
		"overlap of downTrends": {
			isOverlap: false,
			upTrands: upTrands,
			downTrands: downTrands,
			backgroundColor: tags.includes("overlap of uptrends") ? upAndDownTrandOverlapBackgroundColor :(ctx, option: { downTrands: boolean[][] }) => {
				const { downTrands } = option;
				const { datasetIndex, p0DataIndex } = ctx;
				let isOverlap = true;

				if (downTrands[datasetIndex][p0DataIndex]) {
					downTrands.forEach(downTrand => {
						if (downTrand[p0DataIndex] === false) {
							isOverlap = false;
						}
					});
				} else {
					isOverlap = false;
				}

				if (isOverlap) {
					return "rgba(100, 0, 0, 0.3)";
				} else {
					return undefined;
				}
			},
		},
		"overlap of downTrends and upTrends": {
			isOverlap: false,
			downTrands: downTrands,
			upTrands: upTrands,
			backgroundColor(ctx: ScriptableLineSegmentContext, option: { downTrands: boolean[][]; upTrands: boolean[][] }) {
				const { downTrands, upTrands } = option;
				const { datasetIndex, p0DataIndex } = ctx;
				let isUpTrendOverlap = true;
				let isDownTrendOverlap = true;
				if (downTrands[datasetIndex][p0DataIndex]) {
					downTrands.forEach(downTrand => {
						if (downTrand[p0DataIndex] === false) {
							isUpTrendOverlap = false;
						}
					});
				} else {
					isUpTrendOverlap = false;
				}

				if (upTrands[datasetIndex][p0DataIndex]) {
					upTrands.forEach(downTrand => {
						if (downTrand[p0DataIndex] === false) {
							isDownTrendOverlap = false;
						}
					});
				} else {
					isDownTrendOverlap = false;
				}

				if (isUpTrendOverlap) {
					return "rgba(0, 0, 100, 0.3)";
				}
				
				if (isDownTrendOverlap) {
					return "rgba(100, 0, 0, 0.3)";
				}

				return undefined;
			},
		}
	};
}

function downSegmentBorderColor(ctx: ScriptableLineSegmentContext , value: string) { 
	return ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined; 
}

function upSegmentBorderColor(ctx: ScriptableLineSegmentContext , value: string) { 
	return ctx.p0.parsed.y < ctx.p1.parsed.y ? value : undefined; 
}

function upAndDownSegmentBorderColor(ctx: ScriptableLineSegmentContext , up: string, down: string) {
	return ctx.p0.parsed.y < ctx.p1.parsed.y ? up : down;
}

function upAndDownTrandOverlapBackgroundColor(ctx: ScriptableLineSegmentContext, option: { downTrands: boolean[][]; upTrands: boolean[][] }) {
	const { downTrands, upTrands } = option;
	const { datasetIndex, p0DataIndex } = ctx;
	let isUpTrendOverlap = true;
	let isDownTrendOverlap = true;
	if (downTrands[datasetIndex][p0DataIndex]) {
		downTrands.forEach(downTrand => {
			if (downTrand[p0DataIndex] === false) {
				isUpTrendOverlap = false;
			}
		});
	} else {
		isUpTrendOverlap = false;
	}

	if (upTrands[datasetIndex][p0DataIndex]) {
		upTrands.forEach(downTrand => {
			if (downTrand[p0DataIndex] === false) {
				isDownTrendOverlap = false;
			}
		});
	} else {
		isDownTrendOverlap = false;
	}

	if (isUpTrendOverlap) {
		return "rgba(0, 0, 100, 0.3)";
	}
	
	if (isDownTrendOverlap) {
		return "rgba(100, 0, 0, 0.3)";
	}
	return undefined;
}