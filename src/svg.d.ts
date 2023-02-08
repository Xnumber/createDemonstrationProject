declare module "*.svg" {
	type SVG = ({
		width, height, color
	}:{
		width?: string,
		height?: string,
		color?: string
	}) => JSX.Element;

	const content: SVG;

	export default content;
	export type { SVG };
}