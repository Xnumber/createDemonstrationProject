const cards = [
	{
		variant: "elevation",
		color: "primary",
		style: {
			backgroundColor: "var(--md-sys-color-primary)",
			// color: "var(--md-sys-color-on-primary)",
		}
	},
	{
		variant: "elevation",
		color: "secondary",
		style: {
			backgroundColor: "var(--md-sys-color-secondary)",
			color: "var(--md-sys-color-on-secondary)",
		}
	}
];

export const getPaperStyle = (
	variant: "outlined" | "elevation" | undefined,
	color: string | undefined) => {
	const cardStyle = cards.find(o => {
		return o.variant === variant && o.color === color;
	});
	return cardStyle ? cardStyle.style: {};
};