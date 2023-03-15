import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReduxLegendItem, WeatherLegendState } from "./typing";

const initialState: WeatherLegendState = {
	legendItems: [],
	topLayerDatasetIndex: 0
};

const weatherLegendSlice = createSlice({
	name: "weatherLegend",
	initialState,
	reducers: {
		setLegendItems: (state, action: PayloadAction<ReduxLegendItem[]>) => {
			state.legendItems = action.payload;
		},
		setTopLayerDatasetIndex: (state, action: PayloadAction<{index: number}>) => {
			state.topLayerDatasetIndex = action.payload.index;
		}
	}
});

export default weatherLegendSlice;
export const { setLegendItems, setTopLayerDatasetIndex } = weatherLegendSlice.actions;