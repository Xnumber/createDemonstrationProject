import { ContentChartData } from "./type";
import { TypePercentageData } from "../typePercentageTable/type";
export function getPercentageChartData(data: TypePercentageData[], type: "costPercentage" | "quantityPercentage"): ContentChartData {
	return {
		labels: data.map(d => d.type),
		datasets: [{ fill: true, data: data.map(d => d[type]), backgroundColor: "blue"}]
	};
}