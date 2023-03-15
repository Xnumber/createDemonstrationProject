import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ListConditionProps {
  searchString: string;
  type: "a" | "b"
}

const initialState: ListConditionProps = {
	searchString: "",
	type: "a",
};

export const listConditionSlice = createSlice({
	name: "listCondition",
	initialState,
	reducers: {
		setSearchString: (state, action: PayloadAction<string>) => {
			state.searchString = action.payload;
		},
		setType: (state, action: PayloadAction<"a" | "b">) => {
			state.type = action.payload;
		},
	},
});

export const { setSearchString, setType } = listConditionSlice.actions;
export default listConditionSlice;