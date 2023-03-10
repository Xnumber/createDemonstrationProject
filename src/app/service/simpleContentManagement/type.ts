export type ContentRawData = {
	status: boolean,
	data: {
		type: string;
		quantity: number;
		name: string;
		price: number;
		id: number;
		image: string;
	}[]
}

export type ContentFormProps = {
	[K in Exclude<ContentColumn, "image" | "id">]: string;
} & { image: FileList}

export type ContentColumn = keyof ContentRawData["data"][number];