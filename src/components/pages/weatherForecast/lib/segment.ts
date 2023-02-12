import { getRandomColor } from "src/lib/color";
import { WeatherDataset, WeatherTag, WeatherLineOptionSegmentStyle, Compare } from "../typing";
import type { ScriptableLineSegmentContext } from "chart.js";
import { elementChartDatasetColors, locationChartDatasetColors } from "../const";

export function getSegmentStyledDatasets(datasets: WeatherDataset, tags: WeatherTag[], compare: Compare) {	
	
	const styledDatasets = datasets.reduce((a, currentDataset)=> {
		let backgroundColor = "";
		// console.log(compare);
		// console.log(currentDataset.label);
		// console.log(elementChartDatasetColors);
		// console.log(locationChartDatasetColors);
		if (compare === "element") {
			const label = currentDataset.label;
			const bkgColor = elementChartDatasetColors[label as string].backgroundColor;
			backgroundColor = bkgColor ? bkgColor: "black";
		} else {
			const label = currentDataset.label;
			const bkgColor = locationChartDatasetColors[label as string].backgroundColor;
			backgroundColor = bkgColor ? bkgColor: "black";
		}

		const dataset: WeatherDataset[number] = {
			...currentDataset,
			fill: true,
			tension: 0.2,
			// backgroundColor: (label in locationColors) ? locationColors[label as WeatherLocation].backgroundColor: elementColors[label as WeatherElement].backgroundColor,
			backgroundColor: backgroundColor ? backgroundColor: getRandomColor(),
			
		};
		
		const weatherLineOptionSegmentStyle = getWeatherLineOptionSegmentStyle(tags, datasets);

		tags.forEach(o => {
			if (o in weatherLineOptionSegmentStyle) {
				dataset.segment = {
					...dataset.segment,
					...weatherLineOptionSegmentStyle[o]
				};
			}
		});

		return [
			...a,
			dataset,

		];
	}, []
	);
	// pointRadius: [10, 3, 3],
	// https://github.com/chartjs/Chart.js/issues/5546
	// https://www.chartjs.org/docs/latest/configuration/elements.html#point-styles
	// pointStyle: ["circle", "rectRot"]
	// https://www.chartjs.org/docs/latest/charts/line.html#segment
	// console.log("styledData");
	// console.log(styledData);
	return styledDatasets;
}

function getWeatherLineOptionSegmentStyle(labels: string[], datasets: WeatherDataset): WeatherLineOptionSegmentStyle {
	
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
	console.log("labels", labels);

	return {
		"up-trend": {
			borderColor: (ctx: ScriptableLineSegmentContext) => labels.includes("down-trend") ? upAndDownSegmentBorderColor(ctx, "rgb(192,75,75)", "blue"): upSegmentBorderColor(ctx, "rgb(192,75,75)"),
		},
		"down-trend": {
			borderColor: (ctx: ScriptableLineSegmentContext) =>  labels.includes("up-trend") ? upAndDownSegmentBorderColor(ctx, "rgb(192,75,75)", "blue"): downSegmentBorderColor(ctx, "blue")
		},
		"up-trend-overlap": {
			isOverlap: false,
			upTrands: upTrands,
			downTrands: downTrands,
			backgroundColor: labels.includes("overlap-of-downtrends") ? upAndDownTrandOverlapBackgroundColor :(ctx , option: { upTrands: boolean[][] }) => {
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
		"down-trend-overlap": {
			isOverlap: false,
			upTrands: upTrands,
			downTrands: downTrands,
			backgroundColor: labels.includes("overlap-of-uptrends") ? upAndDownTrandOverlapBackgroundColor :(ctx, option: { downTrands: boolean[][] }) => {
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
		return "rgba(0, 0, 100, 0.3)";
	}
	
	if (isDownTrendOverlap) {
		return "rgba(100, 0, 0, 0.3)";
	}
	return undefined;
}