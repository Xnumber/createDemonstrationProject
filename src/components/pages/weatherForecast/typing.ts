import type { ChartDataset, LineOptions } from "chart.js";
type Compare = "location" | "element";
type WeatherRawData = {
	success: boolean,
	result: {
		resource_id: string;
		fields: {id: string, type: string}
	},
	records: {
		locations: {
			datasetDescription: string;
			locationsName: string;
			dataid: string;
			location: {
				locationName: string;
				geocode: string;
				lat: string;
				lon: string;
				weatherElement: {
					elementName: string;
					description: string;
					time: {
						startTime: string;
						endTime: string;
						elementValue: {
							value: string;
							measures: string;
						}[]
					}[]
				}[]
			}[]
		}[]
	}
}

type WeatherRawDataLocation = WeatherRawData["records"]["locations"][number]["location"];

type WeatherChartTData = { x: string, y:  number | null }[];

type WeatherDataset = ChartDataset<"line", WeatherChartTData>[];

type WeatherPointStyleTag = "max" | "min"

type WeatherSegmentStyleTag = "up" | "down" | "overlap of uptrends" | "overlap of downTrends" | "overlap of downTrends and upTrends";

type WeatherTag = WeatherPointStyleTag | WeatherSegmentStyleTag

type WeatherDerivative = "ma" | "bias" | "average";

type WeatherLineOptionSegmentStyle = {
	[K in WeatherTag]?: Partial<LineOptions["segment"]> | {[K: string]: boolean | boolean[][]};
}
export type { WeatherPointStyleTag, Compare, WeatherDataset, WeatherSegmentStyleTag, WeatherTag, WeatherDerivative, WeatherChartTData, WeatherRawData, WeatherRawDataLocation, WeatherLineOptionSegmentStyle };