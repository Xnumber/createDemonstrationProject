import { createTheme } from "@mui/material";
import { getCardStyle } from "./card";
import { getIconButtonStyle } from "./iconButton";
import { typographies } from "./typography";
import { getSVGIconStyle } from "./svgIcon";
import { getButtonStyle } from "./button";

export const getTheme = () => {
	const theme = createTheme({
		components: {
			MuiBackdrop: {
				styleOverrides: {
					root: {
						zIndex: 101,
						backgroundColor: "rgba(0, 0, 0, 0.85)"
					}
				}
			},
			MuiModal: {
				styleOverrides: {
					root: {
						zIndex: 100
					}
				}
			},
			MuiTabs: {
				styleOverrides: {
					indicator: {
						background: "var(--md-sys-color-secondary)"
					},
				}
			},
			MuiTab: {
				styleOverrides: {
					textColorPrimary: {
						color: "var(--md-sys-color-outline-variant)"
					},
					root: {
						"&.Mui-selected": {
							color: "var(--md-sys-color-secondary) !important"
						}
					}
				}
			},
			MuiTableContainer: {
				styleOverrides: {
					root: {
						background: "var(--md-sys-color-secondary)"
					}
				}
			},
			MuiTablePagination: {
				styleOverrides: {
					root: {
						color: "var(--md-sys-color-secondary)",
						"& .MuiButtonBase-root": {
							color: "var(--md-sys-color-secondary)"
						},
						"& .Mui-disabled": {
							color: "var(--md-sys-color-outline-variant) !important"
						},
					}
				}
			},
			MuiTableHead: {
				styleOverrides: {
					root: {
						background: "var(--md-sys-color-primary)",
						"& .MuiTableCell-head": {
							color: "var(--md-sys-color-on-primary)",
							backgroundColor: "transparent",
							fontWeight: "bolder",
						},
						"& .MuiTableSortLabel-root": {
							color: " var(--md-sys-color-on-primary)"
						},
						"& .MuiTableSortLabel-root.Mui-active": {
							color: " var(--md-sys-color-on-primary)"
						},
					}
				}
			},
			MuiTableSortLabel: {
				styleOverrides: {
					root: {
						"&:hover": {
							color: "var(--md-sys-color-on-primary)"
						},
					},
					iconDirectionAsc: {
						color: "var(--md-sys-color-on-primary) !important",
					},
					iconDirectionDesc: {
						color: "var(--md-sys-color-on-primary) !important",
					}
				}
			},
			MuiTableCell: {
				styleOverrides: {
					root: {
						color: "var(--md-sys-color-on-secondary)"
					}
				}
			},
			MuiInputBase: {
				styleOverrides: {
					root: {
						color: "var(--md-sys-color-secondary)",
						// WebkitTextFillColor: "red",
						"& fieldset": {
							borderColor: "var(--md-sys-color-secondary)",
							borderRadius: 0
						},
						"&:hover fieldset": {
							borderColor: "var(--md-sys-color-secondary) !important"
						},
						"&.Mui-focused fieldset": {
							borderColor: "var(--md-sys-color-secondary) !important"
						},
						"&.Mui-disabled fieldset": {
							color: "var(--md-sys-color-outline-variant) !important",
							borderColor: "var(--md-sys-color-outline-variant) !important"
						},
						"& .Mui-disabled": {
							color: "var(--md-sys-color-outline-variant) !important",
							WebkitTextFillColor: "var(--md-sys-color-outline-variant) !important",
						}
					}
				}
			},
			MuiFormLabel: {
				styleOverrides: {
					root: {
						"&.Mui-disabled": {
							color: "var(--md-sys-color-outline-variant)"
						}
					}
				}
			},
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
			MuiLink: {
				variants: [
					{
						props: { variant: "body1" },
						style: {
							color: "var(--md-sys-color-on-background)",
							textDecorationColor: "var(--md-sys-color-on-background)"
						}
					},
					{
						props: { variant: "body2" },
						style: {
							color: "var(--md-sys-color-on-surface-variant)",
							textDecorationColor: "var(--md-sys-color-on-surface-variant)"
						}
					}
				]
			}
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