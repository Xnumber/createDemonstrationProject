import { LanguageResourceContentKey } from "src/app/language/typing";
import { ElementChartDatasetColors, LocationChartDatasetColors } from "./typing";
import { getRandomColor } from "src/lib/color";

export const locations = [
	"宜蘭縣",
	"花蓮縣",
	"臺東縣",
	"澎湖縣",
	"金門縣",
	"連江縣",
	"臺北市",
	"新北市",
	"桃園市",
	"臺中市",
	"臺南市",
	"高雄市",
	"基隆市",
	"新竹縣",
	"新竹市",
	"苗栗縣",
	"彰化縣",
	"南投縣",
	"雲林縣",
	"嘉義縣",
	"嘉義市",
	"屏東縣",
];

export const elements = [
	// "--",
	// "Wx",
	// "PoP",
	// "CI",
	"T",
	"MinT",
	"MaxT",
];

export const deratives: LanguageResourceContentKey<"weather-forecast">[] = [
	"average", "difference", "moving-average"
];

export const labels: LanguageResourceContentKey<"weather-forecast">[] = [
	"max", "min", "up-trend", "up-trend-overlap", "down-trend", "down-trend-overlap"
];

export const elementChartDatasetColors: ElementChartDatasetColors = elements.reduce((a, c) => {
	return {
		...a,
		[c]: {
			backgroundColor: getRandomColor()
		}
	}; 
}, {});

export const locationChartDatasetColors: LocationChartDatasetColors = locations.reduce((a,c) => {
	return {
		...a,
		[c]: {
			backgroundColor: getRandomColor()
		}
	};
}, {});