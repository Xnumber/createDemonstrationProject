import { createSlice } from "@reduxjs/toolkit";
import type { PaletteMode } from "@mui/material";
export interface LoadingState {
  mode: PaletteMode
}
const mode = localStorage.getItem("front-end-development-mode") as PaletteMode | null;

const initialState: LoadingState = {
	mode: mode ? mode: "light",
};

export const themeControllerSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		toggleTheme: (state) => {
			const newMode = state.mode === "dark" ? "light": "dark";
			localStorage.setItem("front-end-development-mode", newMode);
			state.mode = newMode;
		},
	},
});

// Action creators are generated for each case reducer function
export const { toggleTheme } = themeControllerSlice.actions;

export default themeControllerSlice;