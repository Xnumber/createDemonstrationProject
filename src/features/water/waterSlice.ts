import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import type { PaletteMode } from "@mui/material";
export type WaterReservoirChosen = string;
export type WaterMode = "single" | "compare"
export type WaterSort = "asc" | "desc" | "none";
export type WaterArea = "none" | "基隆" | "台北" | "新北" | "新竹" | "桃園" | "苗栗" | "台中" |
"南投" | "雲林" | "彰化" | "嘉義" | "台南" | "高雄" | "屏東"

export interface WaterState {
	condition: {
		reservoirChosen: string[];
		modeChosen: WaterMode[];
		sortChosen: WaterSort[];
		areaChosen: WaterArea[];
	}
}
const initialState: WaterState = {
	condition: {
		reservoirChosen: [],
		modeChosen: ["single"],
		sortChosen: ["none"],
		areaChosen: ["none"]
	}
};

export const waterSlice = createSlice({
	name: "water",
	initialState,
	reducers: {
		handleReservoir: (state, action: PayloadAction<string[]>) => {
			state.condition.reservoirChosen = action.payload;
			console.log("handleReservoir");
			state.condition.areaChosen = ["none"];
		},
		handleMode: (state, action: PayloadAction<WaterMode>) => {
			state.condition.modeChosen = [action.payload];
		},
		handleSort: (state, action: PayloadAction<WaterSort>) => {
			state.condition.sortChosen = [action.payload];
		},
		handleArea: (state, action: PayloadAction<WaterArea>) => {
			state.condition.areaChosen = [action.payload];
			console.log("handleArea");
			state.condition.reservoirChosen = [];
		},
	},
});

// // Action creators are generated for each case reducer function
export const WaterActions = waterSlice.actions;