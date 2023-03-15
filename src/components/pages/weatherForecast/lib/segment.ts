import { WeatherDataset, WeatherLineOptionSegmentStyle } from "../typing";
import type { ScriptableLineSegmentContext } from "chart.js";
export function getSegmentStyleHandler(labels: string[], datasets: WeatherDataset): WeatherLineOptionSegmentStyle {
	
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
		"up-trend": {
			borderColor: (ctx: ScriptableLineSegmentContext) => labels.includes("down-trend") ? upAndDownSegmentBorderColor(ctx, "red", "blue"): upSegmentBorderColor(ctx, "red"),
		},
		"down-trend": {
			borderColor: (ctx: ScriptableLineSegmentContext) =>  labels.includes("up-trend") ? upAndDownSegmentBorderColor(ctx, "red", "blue"): downSegmentBorderColor(ctx, "blue")
		},
		"up-trend-overlap": {
			isOverlap: false,
			upTrands: upTrands,
			downTrands: downTrands,
			backgroundColor: labels.includes("down-trend-overlap") ? upAndDownTrandOverlapBackgroundColor :(ctx , option: { upTrands: boolean[][] }) => {
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
					return "red";
				} else {
					return undefined;
				}
			},
		},
		"down-trend-overlap": {
			isOverlap: false,
			upTrands: upTrands,
			downTrands: downTrands,
			backgroundColor: labels.includes("up-trend-overlap") ? upAndDownTrandOverlapBackgroundColor :(ctx, option: { downTrands: boolean[][] }) => {
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
					return "green";
				} else {
					return undefined;
				}
			},
		},
		"overlap-of-downtrends-and-uptrends": {
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
		return "green";
	}
	
	if (isDownTrendOverlap) {
		return "red";
	}
	return undefined;
}