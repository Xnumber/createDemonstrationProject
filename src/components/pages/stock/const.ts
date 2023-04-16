import StockEn from "src/app/language/locales/en/stock.json";
export const features: (keyof typeof StockEn)[] = [
	"grid", "klines", "line", "moving-averages", "cross-hair", "x-asix", "y-axis", "current-day"
];

export const data: (keyof typeof StockEn)[] = [
	"twse", "node"
];

export const tools: (keyof typeof StockEn)[] = [
	"canvas", "javascript"
];

export const designs: (keyof typeof StockEn)[] = [
	"object-oriented-programming", "dependency-injection", "inversion-of-control",
	"graph-lazy-load"
];

export const memoryLeaks: (keyof typeof StockEn)[] = [
	"chrome-memory-snapshot", "reference-checking", "remove-event-handler"
];