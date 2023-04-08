export type StockRawData = [string, string, string, string, string][];
export type ChartData = [string, number, number, number, number][];
export type KLineBarRange = {
	range: [number, number],
	data: ChartData[number]
};
export type MAConfigure = {
	day: number;
	color: string;
	display: boolean;
};