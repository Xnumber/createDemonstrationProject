import { ContentRawData } from "./type";

export const contentColumns: (keyof ContentRawData["data"][number])[] = [
	"id",
	"type",
	"name",
	"price", 
	"quantity",
	"image",
];