const typographies = [
	{
		variant: "h1",
		style: {
			color: "var(--md-sys-color-on-background)",
		}
	},
	{
		variant: "h2",
		color: "primary",
		style: {
			color: "var(--md-sys-color-on-background)",
		}
	},
	{
		variant: "h3",
		style: {
			// backgroundColor: "var(--md-sys-color-primary)",
			color: "var(--md-sys-color-on-background)",
			// fontSize: "2rem"
		}
	},
	{
		variant: "h5",
		// color: "on-background",
		style: {
			// backgroundColor: "var(--md-sys-color-primary)",
			color: "var(--md-sys-color-on-background)",
		}
	},
	{
		variant: "h6",
		// color: "on-background",
		style: {
			// backgroundColor: "var(--md-sys-color-primary)",
			color: "var(--md-sys-color-on-background)",
			fontWeight: 300,
		}
	},
	{
		variant: "body1",
		style: {
			color: "var(--md-sys-color-on-background)",
			fontSize: "1.5rem",
			letterSpacing: "1px"
		}
	},
	// {
	// 	variant: "body2",
	// 	style: {
	// 		color: "var(--md-sys-color-on-background)",
	// 		fontSize: "1rem"
	// 	}
	// },
	{
		variant: "button",
		style: {
			fontSize: "0.75rem",
			lineHeight: "1rem"
		}
	}
];

export const getTypoGraphyStyle = (variant: "body2" | "body1" | "caption" | "button" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "overline" | "inherit" | undefined) => {
	const buttonStyle = typographies.find(o => {
		return  o.variant === variant;
	});
	return buttonStyle ? buttonStyle.style: {};
};