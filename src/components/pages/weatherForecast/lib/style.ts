import { getRandomColor } from "src/lib/color";
import { WeatherDataset, WeatherTag, Compare } from "../typing";
import { elementChartDatasetColors, locationChartDatasetColors } from "../const";
import { getWeatherLineOptionSegmentStyle } from "./segment";

export function getStyledDatasets(datasets: WeatherDataset, tags: WeatherTag[], compare: Compare) {	
	const styledDatasets = datasets.reduce((a, currentDataset)=> {
		let backgroundColor = "";

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
	return styledDatasets;
}