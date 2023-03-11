export type ColumnData<K, L> = {
	dataKey: K;
	label: L;
	numeric?: boolean;
	width: number;
	type: "display" | "action";
	sortable?: boolean;
}

export type Order = "asc" | "desc";