import { ContentChartData, PercentageChartType } from "./type";
import { TypePercentageData } from "../typePercentageTable/type";
import { getRandomColor } from "src/lib/color";
import type { PaletteMode } from "@mui/material";
import type { TFunction } from "i18next";
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

export const getChartOptions = (chartType: PercentageChartType, mode: PaletteMode, t: TFunction) => {
	if (chartType !== "polarArea") {
		return {
			maintainAspectRatio: false,
			responsive: true,
			scales: {
				y: {
					max: 1,
					min: 0,
					offset: true,
					title: {
						display: true,
						text: "%",
						color: mode === "light" ? "#1b1b1f": "#e3e2e6",
						font: {
							size: 32
						},
					},
					ticks: {
						color: mode === "light" ? "#1b1b1f": "#e3e2e6",
					},
					grid: {
						display: false,
					}
				},
				x: {
					ticks: {
						color: mode === "light" ? "#1b1b1f": "#e3e2e6",
					},
					title: {
						display: true,
						text: t("type"),
						color: mode === "light" ? "#1b1b1f": "#e3e2e6",
						font: {
							size: 32,
							family: "sans-serif, 'Noto Sans TC'",
						},
					},
					grid: {
						display: false,
					}
				}
			},
			plugins: {
				legend: { display: false }
			}
		};
	} else {
		return {
			maintainAspectRatio: false,
			responsive: true,
			scales: {
				r: {
					ticks: {
						color: mode === "light" ? "#1b1b1f": "#e3e2e6",
						backdropColor: "transparent",
						callback: (tickValue: number) => {
							return `${tickValue*100}%`;
						},
					},
				}
			},
			plugins: {
				legend: { display: false }
			}
		};
	}
};