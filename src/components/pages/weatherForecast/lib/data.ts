import { ChartDataset } from "chart.js";
import { 
	WeatherRawDataLocation,
	WeatherRawData,
	WeatherChartTData
} from "../typing";
export function getChartDatasetFromWeatherRawData(rawData: WeatherRawData | undefined, compare: "location" | "element"): ChartDataset<"line", WeatherChartTData>[] {
	if(!rawData) { return [];}
	
	const location = rawData.records.locations.find(l => l.locationsName === "台灣")?.location;

	if(location && compare === "location") {
		return getChartDataGroupByLocation(location);
	} else if(location && compare === "element"){
		
		return getChartDataGroupByElement(location);
	} else {
		return [];
	}
}

function getChartDataGroupByElement (location: WeatherRawDataLocation): ChartDataset<"line", WeatherChartTData>[] {
	const datasets = location[0] ? location[0].weatherElement.map(o => {
		return {
			label: o.elementName,
			data: o.time.map(t => {
				return {
					x: t.startTime,
					y: Number(t.elementValue[0]?.value),
				};
			}),
		};
	}): [];

	return datasets;
}

function getChartDataGroupByLocation(location: WeatherRawDataLocation): ChartDataset<"line", WeatherChartTData>[] {
	const datasets =  location.map(o => {
		return {
			label: o.locationName,
			data: o.weatherElement[0].time.map(t => {
				return {
					x: t.startTime,
					y: Number(t.elementValue[0]?.value)
				};
			}),
		};
	});
	
	return datasets;
}