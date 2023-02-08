const inputs = [
	{
		// variant: "contained",
		color: "primary",
		style: {
			color: "var(--md-sys-color-on-background)",
			backgroundColor: "var(--md-sys-color-background)",
			// "&:hover": {
			// 	backgroundColor: "var(--md-sys-color-background)",
			// },
			// "&:hover > .a-mdInput__stateLayer": {
			// 	opacity: 0.08
			// },
			// "&:focus > .a-mdInput__stateLayer": {
			// 	opacity: 0.12
			// },
			// "&:active > .a-mdInput__stateLayer": {
			// 	opacity: 0.12
			// },
			"&:before": {
				borderBottom: "2px solid var(--md-sys-color-outline)"
			},
			"&:after": {
				borderBottom: "2px solid var(--md-sys-color-outline)"
			}
		}
	}
];

export const getInputStyle = (
	color: "error" | "inherit" | "secondary" | "primary" | "success" | "info" | "warning" | undefined) => {
	const buttonStyle = inputs.find(o => {
		return o.color === color;
	});
	return buttonStyle ? buttonStyle.style: {};
};