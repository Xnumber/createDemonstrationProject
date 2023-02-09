import { ChartDataset } from "chart.js";
import { 
	WeatherRawDataLocation,
	WeatherRawData,
	WeatherTData
} from "./typing";

export function getChartDataFromWeatherRawData(rawData: WeatherRawData, by: "location" | "element"): ChartDataset<"line", WeatherTData>[] {
	const location = rawData.records.locations.find(l => l.locationsName === "台灣")?.location;

	if(location && by === "location") {
		return getChartDataGroupByLocation(location);
	} else if(location && by === "element"){
		
		return getChartDataGroupByElement(location);
	} else {
		return [];
	}
}

function getChartDataGroupByLocation (location: WeatherRawDataLocation): ChartDataset<"line", WeatherTData>[] {
	const datasets = location[0] ? location[0].weatherElement.map(o => {
		return {
			label: o.elementName,
			xAxisID: "time",
			data: o.time.map(t => {
				return {
					x: t.startTime,
					y: t.elementValue[0]?.value,
				};
			}),
		};
	}): [];

	return datasets;
}

function getChartDataGroupByElement(location: WeatherRawDataLocation): ChartDataset<"line", WeatherTData>[] {
	const datasets =  location.map(o => {
		return {
			label: o.locationName,
			data: o.weatherElement[0].time.map(t => {
				return {
					x: t.startTime,
					y: t.elementValue[0]?.value
				};
			}),
		};
	});
	
	return datasets;
}