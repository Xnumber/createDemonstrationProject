import type { PaperProps } from "@mui/material";
import type { Interpolation, Theme } from "@mui/material/styles";

export const paparStyles: {
    props: Partial<PaperProps>;
    style: Interpolation<{
        theme: Theme;
    }>;
}[] = [
	{
		props: { variant: "elevation" },
		style: {
			backgroundColor: "var(--md-sys-color-surface-variant)",
			padding: "1rem"
		}
	},
];

// export const getPaperStyle = (
// 	variant: "outlined" | "elevation" | undefined,
// 	color: string | undefined) => {
// 	const cardStyle = cards.find(o => {
// 		return o.variant === variant && o.color === color;
// 	});
// 	return cardStyle ? cardStyle.style: {};
// };