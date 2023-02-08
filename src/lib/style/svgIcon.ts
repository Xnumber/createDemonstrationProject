const styles = [
	{
		type: "secondary",
		style: {
			color: "var(--md-sys-color-on-secondary)"
		}
		
	},
	{
		type: "var(--md-sys-color-on-secondary)",
		style: {
			color: "var(--md-sys-color-on-secondary)"
		}
	}
];

export const getSVGIconStyle = (color:  "error" | "disabled" | "action" | "secondary" | "inherit" | "primary" | "success" | "info" | "warning"| undefined) => {
	const type = styles.find(o => o.type === color);	// const styles[color];
	// console.log("style", type);
	return type ? type.style: {};
};