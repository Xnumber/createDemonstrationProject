import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ListConditionProps {
  searchString: string;
  type: "a" | "b" | "c" | ""
}

const initialState: ListConditionProps = {
	searchString: "",
	type: "",
};

export const listConditionSlice = createSlice({
	name: "listCondition",
	initialState,
	reducers: {
		setSearchString: (state, action: PayloadAction<string>) => {
			state.searchString = action.payload;
		},
		setType: (state, action: PayloadAction<ListConditionProps["type"]>) => {
			state.type = action.payload;
		},
	},
});

export const { setSearchString, setType } = listConditionSlice.actions;
export default listConditionSlice;