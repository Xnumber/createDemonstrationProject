export type DetailModalProps = {
	title: string;
	img?: string;
	details: {
		column: string;
		content: string | number;
	}[];
}