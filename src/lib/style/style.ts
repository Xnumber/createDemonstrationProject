import { createTheme, PaletteMode, ThemeOptions } from "@mui/material";
import { getButtonStyle } from "./button";
import { getCardStyle } from "./card";
// import { getIconButtonChildStyle } from "./iconButton";
import { getIconButtonStyle } from "./iconButton";
import { getInputStyle } from "./input";
import { getTypoGraphyStyle } from "./typography";
import { getSVGIconStyle } from "./svgIcon";
import { getPaperStyle } from "./paper";
// export const getDarkModePalette = () => {
// 	return {
		
// 	}
// }
export const getPalette = (mode: PaletteMode): ThemeOptions => ({
	palette: {
		mode,
		...(mode === "light"
			? {
				// palette values for light mode
				primary: {
					main: "#b3e5fc",
					light: "#e6ffff",
					dark: "#82b3c9",
				},
				secondary: {
					main: "#b2dfdb",
					light: "#e5ffff",
					dark: "#82ada9",
				},
				// text: {
				// 	primary: "#000000",
				// 	secondary: "#000000"
				// },
				// background: {
				// 	default: "#e6ffff",
				// 	paper: "#82b3c9"
				// },
			}
			: {
				primary: {
					main: "#263238",
					light: "#4f5b62",
					dark: "#000a12",
				},
				secondary: {
					main: "#006064",
					light: "#428e92",
					dark: "#00363a",	
				},
				text: {
					primary: "#ffffff",
					secondary: "#ffffff"
				}
				// palette values for dark mode
			}),
	},
});
export const getTheme = () => {
	const theme = createTheme({
		// palette: {
		// 	primary: {
		// 		main: "#fff"
		// 	}
		// },
		
		// spacing: (factor: number) => `${1 * factor}px`,
		// spacing: "3px",
		components: {
			MuiTypography: {
				styleOverrides: {
					root: ({ ownerState }) => {
						const { variant } = ownerState;
						const style = getTypoGraphyStyle(variant);
						// style;
						
						return style;
					}
				},
				variants: [{
					props: { variant: "h5" },
					style: {
						color: "var(--md-sys-color-on-secondary)",
						fontWeight: 700,
					}
				}]
			},
			MuiButton: {
				"defaultProps": {
					disableRipple: true
				},
				styleOverrides: {
					root: ({ ownerState }) => {
						const { variant, color } = ownerState;
						const style = getButtonStyle(variant, color);
						return style;
					}
				}
			},
			MuiCard: {
				styleOverrides: {
					root: ({ ownerState }) => {
						const { variant, color } = ownerState;

						const style = getCardStyle(variant, color);
						return style;
					}
				}
			},
			MuiIconButton: {
				styleOverrides: {
					root: ({ ownerState }) => {
						const { color } = ownerState;
						const style = getIconButtonStyle(color);
						return style;
					},
				}
			},
			MuiSvgIcon: {
				styleOverrides: {
					root: ({ ownerState }) => {
						const style = getSVGIconStyle(ownerState.color);
						
						return style;
					}
				}
			},
			// MuiTouchRipple: {
			// 	styleOverrides: {
			// 		root: ({ ownerState }) => {
			// 			const { color } = ownerState;
			// 			const style = getIconButtonStyle(color);
			// 			style;
			// 			return {
			// 				backgroundColor: "#000"
			// 			};
			// 		},
			// 	}
			// },
			MuiInput: {
				styleOverrides: {
					root: ({ ownerState }) => {
						const { color } = ownerState;
						const style = getInputStyle(color);
						return style;
					}
				}
			},

			MuiBreadcrumbs: {
				styleOverrides: {
					root: () => {
						return {
							".MuiBreadcrumbs-separator": { 
								color: "var(--md-sys-color-on-background)" 
							},
							".MuiBreadcrumbs-ol": {
								justifyContent: "center"
							}
						};
					}
				}
			},
			MuiPaper: {
				styleOverrides: {
					root: ({ ownerState }) => {
						const { variant, color } = ownerState;

						const style = getPaperStyle(variant, color);
						return style;
					}
				}
			},
		},
		typography: {
			fontFamily: [
				// "-apple-system",
				// "Roboto",
				"sans-serif",
				"Noto Sans TC",
				// "BlinkMacSystemFont",
				// "\"Segoe UI\"",
				// "\"Helvetica Neue\"",
				// "Arial",
				// "sans-serif",
				// "\"Apple Color Emoji\"",
				// "\"Segoe UI Emoji\"",
				// "\"Segoe UI Symbol\"",
				// "微軟正黑體"
			].join(","),
		},
		
		// "spacing"
	// palette: {
	// 	mode: mode,
	// },
	});
	return theme;
};
// export interface PaletteOptions {
// 	primary?: PaletteColorOptions;
// 	secondary?: PaletteColorOptions;
// 	error?: PaletteColorOptions;
// 	warning?: PaletteColorOptions;
// 	info?: PaletteColorOptions;
// 	success?: PaletteColorOptions;
// 	mode?: PaletteMode;
// 	tonalOffset?: PaletteTonalOffset;
// 	contrastThreshold?: number;
// 	common?: Partial<CommonColors>;
// 	grey?: ColorPartial;
// 	text?: Partial<TypeText>;
// 	divider?: string;
// 	action?: Partial<TypeAction>;
// 	background?: Partial<TypeBackground>;
// 	getContrastText?: (background: string) => string;
//   }