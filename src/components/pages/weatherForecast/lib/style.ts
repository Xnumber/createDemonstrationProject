import { WeatherDataset, WeatherTag, Compare } from "../typing";
import { elementChartDatasetColors, locationChartDatasetColors } from "../const";
import { getSegmentStyleHandler } from "./segment";
import { findMaxIndexes, findMinIndexes } from "./point";

export function getStyledDatasets(datasets: WeatherDataset, tags: WeatherTag[], compare: Compare) {	
	const styledDatasets = datasets.reduce((a, currentDataset)=> {
		let backgroundColor = "";

		if (compare === "element") {
			const label = currentDataset.label;
			const bkgColor = elementChartDatasetColors[label as string]?.backgroundColor;
			backgroundColor = bkgColor ? bkgColor: "aqua";
		} else {
			const label = currentDataset.label;
			const bkgColor = locationChartDatasetColors[label as string]?.backgroundColor;
			backgroundColor = bkgColor ? bkgColor: "aqua";
		}

		const dataset: WeatherDataset[number] = {
			...currentDataset,
			fill: true,
			tension: 0.2,
			backgroundColor: backgroundColor,
			pointStyle: () => "circle",
			pointRadius: () => 3,
			pointBackgroundColor: () => backgroundColor,
			pointHoverRadius: 20,
			segment: {}
		};
		
		const segmentStyleHandlers = getSegmentStyleHandler(tags, datasets);
		
		tags.forEach(o => {
			if (o in segmentStyleHandlers) {
				dataset.segment = {
					...segmentStyleHandlers[o]
				};
			}

			if (o === "min" && tags.includes("max")) {
				const minDataIndexes = findMinIndexes(dataset.data.map(d=>d.y ? d.y: 0));
				const maxDataIndexes = findMaxIndexes(dataset.data.map(d=>d.y ? d.y: 0));
				dataset.pointStyle = function(ctx) {
					if (minDataIndexes.indexOf(ctx.dataIndex) !== -1) {
						return "rectRot";
					}
					if (maxDataIndexes.indexOf(ctx.dataIndex) !== -1) {
						return "rectRot";
					}
					return "circle";
				};
				dataset.pointRadius = function(ctx) {
					if (minDataIndexes.indexOf(ctx.dataIndex) !== -1) {
						return 12;
					}
					if (maxDataIndexes.indexOf(ctx.dataIndex) !== -1) {
						return 12;
					}
					return 3;
				};
				dataset.pointBackgroundColor = function(ctx) {
					if (minDataIndexes.indexOf(ctx.dataIndex) !== -1) {
						return "green";
					}
					if (maxDataIndexes.indexOf(ctx.dataIndex) !== -1) {
						return "red";
					}
					return dataset.backgroundColor as string;
				};
			} else if(o === "min") {
				const minDataIndexes = findMinIndexes(dataset.data.map(d=>d.y ? d.y: 0));
				dataset.pointStyle = function(ctx) {
					if (minDataIndexes.indexOf(ctx.dataIndex) !== -1) {
						return "rectRot";
					}
					return "circle";
				};
				dataset.pointBackgroundColor = function(ctx) {
					if (minDataIndexes.indexOf(ctx.dataIndex) !== -1) {
						return "green";
					}
					return dataset.backgroundColor as string;
				};
				dataset.pointRadius = function(ctx) {
					if (minDataIndexes.indexOf(ctx.dataIndex) !== -1) {
						return 12;
					}
					return 3;
				};
			} else if (o === "max") {
				const maxDataIndexes = findMaxIndexes(dataset.data.map(d=>d.y ? d.y: 0));
				dataset.pointStyle = function(ctx) {
					if (maxDataIndexes.indexOf(ctx.dataIndex) !== -1) {
						return "rectRot";
					}
					return "circle";
				};
				dataset.pointRadius = function(ctx) {
					if (maxDataIndexes.indexOf(ctx.dataIndex) !== -1) {
						return 12;
					}
					return 3;
				};

				dataset.pointBackgroundColor = function(ctx) {
					if (maxDataIndexes.indexOf(ctx.dataIndex) !== -1){
						return "red";
					}
					return dataset.backgroundColor as string;
				};
			}
		});

		return [
			...a,
			dataset,
		];
	}, []
	);
	return styledDatasets;
}