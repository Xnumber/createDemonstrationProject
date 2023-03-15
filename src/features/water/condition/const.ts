import { WaterArea, WaterMode, WaterSort } from "../waterSlice";

export const modes: WaterMode[] = [
	"single", "compare"
];

export const sorts: WaterSort[] = [
	"none",	"asc", "desc",
];

export const areas: WaterArea[] = [
	"none",
	"基隆", "台北", "新北", "新竹", "桃園", "苗栗", "台中",
	"南投", "雲林", "彰化", "嘉義", "台南", "高雄", "屏東"
];