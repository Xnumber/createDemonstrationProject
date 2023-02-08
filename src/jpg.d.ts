declare module "*.jpg" {
	// type JPG = ({
	// 	width, height, color
	// }:{
	// 	width?: string,
	// 	height?: string,
	// 	color?: string
	// }) => JSX.Element;

	type JPG = string;

	const content: JPG;

	export default content;
	export type { JPG };
}