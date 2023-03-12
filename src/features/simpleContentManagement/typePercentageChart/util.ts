import { ContentChartData } from "./type";
import { TypePercentageData } from "../typePercentageTable/type";
import { getRandomColor } from "src/lib/color";

const colors: {
	[k: string]: string
} = {
	"a": getRandomColor(),
	"b": getRandomColor(),
	"c": getRandomColor(),
};

export function getPercentageChartData(
	data: TypePercentageData[],
	type: "costPercentage" | "quantityPercentage", 
	chartType: "line" | "bar" | "polarArea"
): ContentChartData {
	return {
		labels: data.map(d => d.type),
		datasets: [{ 
			fill: true, data: data.map(d => d[type]), 
			backgroundColor: chartType === "line" ? "blue": data.map(d => colors[d.type])
		}]
	};
}