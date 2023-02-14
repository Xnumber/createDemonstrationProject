import { getRandomColor } from "src/lib/color";
import { WeatherDataset, WeatherTag, Compare } from "../typing";
import { elementChartDatasetColors, locationChartDatasetColors } from "../const";
import { getSegmentStyleHandler } from "./segment";
import { findMaxIndexes, findMinIndexes, getMaxPointCanvas, getMinPointCanvas } from "./point";

export function getStyledDatasets(datasets: WeatherDataset, tags: WeatherTag[], compare: Compare) {	
	const styledDatasets = datasets.reduce((a, currentDataset)=> {
		let backgroundColor = "";

		if (compare === "element") {
			const label = currentDataset.label;
			const bkgColor = elementChartDatasetColors[label as string]?.backgroundColor;
			backgroundColor = bkgColor ? bkgColor: "black";
		} else {
			const label = currentDataset.label;
			const bkgColor = locationChartDatasetColors[label as string]?.backgroundColor;
			backgroundColor = bkgColor ? bkgColor: "black";
		}

		const dataset: WeatherDataset[number] = {
			...currentDataset,
			fill: true,
			tension: 0.2,
			backgroundColor: backgroundColor ? backgroundColor: getRandomColor(),
		};
		
		const segmentStyleHandlers = getSegmentStyleHandler(tags, datasets);
		
		tags.forEach(o => {
			if (o in segmentStyleHandlers) {
				dataset.segment = {
					...segmentStyleHandlers[o]
				};
			}

			if (o === "min" && tags.includes("max")) {
				const minPointStyle = getMinPointCanvas(dataset.label);
				const minDataIndexes = findMinIndexes(dataset.data.map(d=>d.y ? d.y: 0));
				const maxDataIndexes = findMaxIndexes(dataset.data.map(d=>d.y ? d.y: 0));
				const maxPointStyle = getMaxPointCanvas(dataset.label);
				dataset.pointStyle = function(ctx) {
					if (minDataIndexes.indexOf(ctx.dataIndex) !== -1) {
						return minPointStyle;
					}
					if (maxDataIndexes.indexOf(ctx.dataIndex) !== -1) {
						return maxPointStyle;
					}
				};
				dataset.pointRadius = function(ctx) {
					if (minDataIndexes.indexOf(ctx.dataIndex) !== -1) {
						return 30;
					}
					if (maxDataIndexes.indexOf(ctx.dataIndex) !== -1) {
						return 30;
					}
				};
			} else if(o === "min") {
				const minPointStyle = getMinPointCanvas(dataset.label);
				const minDataIndexes = findMinIndexes(dataset.data.map(d=>d.y ? d.y: 0));
				dataset.pointStyle = function(ctx) {
					if (minDataIndexes.indexOf(ctx.dataIndex) !== -1) {
						return minPointStyle;
					}
				};
				dataset.pointRadius = function(ctx) {
					if (minDataIndexes.indexOf(ctx.dataIndex) !== -1) {
						return 30;
					}
				};
			} else if (o === "max") {
				const maxDataIndexes = findMaxIndexes(dataset.data.map(d=>d.y ? d.y: 0));
				const maxPointStyle = getMaxPointCanvas(dataset.label);
				dataset.pointStyle = function(ctx) {
					if (maxDataIndexes.indexOf(ctx.dataIndex) !== -1) {
						return maxPointStyle;
					}
				};
				dataset.pointRadius = function(ctx) {
					if (maxDataIndexes.indexOf(ctx.dataIndex) !== -1) {
						return 30;
					}
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
	return styledDatasets;
}