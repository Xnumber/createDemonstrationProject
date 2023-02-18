import { createTheme } from "@mui/material";
import { getButtonStyle } from "./button";
import { getCardStyle } from "./card";
import { getIconButtonStyle } from "./iconButton";
import { typographies } from "./typography";
import { getSVGIconStyle } from "./svgIcon";

export const getTheme = () => {
	const theme = createTheme({
		components: {
			MuiGrid2: {
				defaultProps: {
					spacing: 2
				}
			},
			MuiRadio: {
				styleOverrides: {
					root: () => {
						return {
							color: "var(--md-sys-color-secondary)",
							"&.Mui-checked": { color: "var(--md-sys-color-secondary)"}
						};
					},
				}
			},
			MuiFormControlLabel: {
				styleOverrides: {
					
					root: () => {
						return {
							color: "var(--md-sys-color-secondary)",
						};
					},
				}
			},
			MuiInputLabel: {
				styleOverrides: {
					root: () => {
						return {
							background: "var(--md-sys-color-background)",
							color: "var(--md-sys-color-secondary)",
							"&.Mui-focused": {
								color: "var(--md-sys-color-on-background)",
							},
							padding: "0 0.5rem"
						};
					},
				}
			},
			MuiFormControl: {
				styleOverrides: {
					root: () => {
						return {
							width: "100%"
						};
					}
				}
			},
			MuiSelect: {
				styleOverrides: {
					"select": {
						color: "var(--md-sys-color-secondary)"
					},
					"icon": {
						color: "var(--md-sys-color-secondary)"
					}
				},
			},
			MuiList: {
				styleOverrides: {
					"root": {
						color: "var(--md-sys-color-on-secondary)",
						background: "var(--md-sys-color-secondary)"
					}
				}
			},
			MuiMenuItem: {
				styleOverrides: {
					root: {
						"&.Mui-selected": {
							color: "var(--md-sys-color-on-background)",
							background : "var(--md-sys-color-background) !important" 
						}
					}
				}
			},
			MuiTypography: {
				variants: [
					...typographies,
				]
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
			// MuiPaper: {
			// 	variants: paparStyles,
			// },
		},
		typography: {
			fontFamily: [
				// "-apple-system",
				"sans-serif",
				"Noto Sans TC",
			].join(","),
		},
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