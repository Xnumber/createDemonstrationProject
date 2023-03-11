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

export type ContentData = ContentRawData["data"][number]

export type ContentColumn = keyof ContentRawData["data"][number];