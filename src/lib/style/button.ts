const buttons = [
	{
		variant: "contained",
		color: "primary",
		style: {
			color: "var(--md-sys-color-on-primary)",
			backgroundColor: "var(--md-sys-color-primary)",
			"&:hover": {
				backgroundColor: "var(--md-sys-color-primary)"
			},
			// "&:hover > .a-mdButton__stateLayer": {
			// 	opacity: 0.08
			// },
			// "&:focus > .a-mdButton__stateLayer": {
			// 	opacity: 0.12
			// },
			// "&:active > .a-mdButton__stateLayer": {
			// 	opacity: 0.12
			// }
			// drag: 0.16
		}
	},
	{
		variant: "contained",
		color: "secondary",
		style: {
			color: "var(--md-sys-color-on-secondary)",
			backgroundColor: "var(--md-sys-color-secondary)",
			"&:hover": {
				backgroundColor: "var(--md-sys-color-secondary)"
			},
			// "&:hover > .a-mdButton__stateLayer": {
			// 	opacity: 0.08
			// },
			// "&:focus > .a-mdButton__stateLayer": {
			// 	opacity: 0.12
			// },
			// "&:active > .a-mdButton__stateLayer": {
			// 	opacity: 0.12
			// }
			// drag: 0.16
		}
	},
	{
		variant: "contained",
		color: "info",
		style: {
			color: "var(--md-sys-color-on-tertiary)",
			backgroundColor: "var(--md-sys-color-tertiary)",
			"&:hover": {
				backgroundColor: "var(--md-sys-color-tertiary)"
			},
			// "&:hover > .a-mdButton__stateLayer": {
			// 	opacity: 0.08
			// },
			// "&:focus > .a-mdButton__stateLayer": {
			// 	opacity: 0.12
			// },
			// "&:active > .a-mdButton__stateLayer": {
			// 	opacity: 0.12
			// }
			// drag: 0.16
		}
	},
];

export const getButtonStyle = (
	variant: "text" | "outlined" | "contained" | undefined, 
	color: "error" | "inherit" | "secondary" | "primary" | "success" | "info" | "warning" | undefined) => {
	const buttonStyle = buttons.find(o => {
		return o.variant === variant && o.color === color;
	});
	return buttonStyle ? buttonStyle.style: {};
};