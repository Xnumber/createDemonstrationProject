const iconButtons = [
	{
		color: "primary",
		style: {
			"& > .MuiTouchRipple-root > .MuiTouchRipple-ripple > .MuiTouchRipple-child": {
				backgroundColor: "var(--md-sys-color-primary)"
			}
		},

	},
	{
		color: "error",
		style: {
			"& > .MuiTouchRipple-root > .MuiTouchRipple-ripple > .MuiTouchRipple-child": {
				backgroundColor: "var(--md-sys-color-error)"
			}
		},
	},
	{
		color: "info",
		style: {
			"& > .MuiTouchRipple-root > .MuiTouchRipple-ripple > .MuiTouchRipple-child": {
				backgroundColor: "var(--md-sys-color-tertiary)"
			}
		},
	}
];

export const getIconButtonStyle = (
	// variant: "text" | "outlined" | "contained" | undefined, 
	color: string | undefined) => {
	const buttonStyle = iconButtons.find(o => {
		return o.color === color;
	});
	return buttonStyle ? buttonStyle.style: {};
};

// export const getIconButtonChildStyle = (
// 	// variant: "text" | "outlined" | "contained" | undefined, 
// 	color:  string | undefined) => {
// 	const buttonStyle = iconButtons.find(o => {
// 		return o.color === color;
// 	});
// 	return buttonStyle ? buttonStyle.childStyle: {};
// };