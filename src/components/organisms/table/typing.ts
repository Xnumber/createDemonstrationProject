export type ColumnData<K> = {
	dataKey: K;
	label: K;
	numeric?: boolean;
	width: number;
	type: "display" | "action";
	sortable?: boolean;
}

export type Order = "asc" | "desc";