import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ListActionProps {
	contentDetailModalId: number | null;
	contentDetailModalShown: boolean,
	updateModalContentId: number | null;
	updateModalShown: boolean,
}

const initialState: ListActionProps = {
	contentDetailModalId: null,
	contentDetailModalShown: false,
	updateModalContentId: null,
	updateModalShown: false,
};

export const listActionSlice = createSlice({
	name: "listAction",
	initialState,
	reducers: {
		setUpdateModalShown: (state, action: PayloadAction<boolean>) => {
			state.updateModalShown = action.payload;
		},
		setDetailModalShown: (state, action: PayloadAction<boolean>) => {
			state.contentDetailModalShown = action.payload;
		},
		updateModalContentId: (state, action: PayloadAction<number>) => {
			state.updateModalContentId = action.payload;
		},
		openUpdateModal: (state, action: PayloadAction<number>) => {
			state.updateModalContentId = action.payload;
			state.updateModalShown = true;
		},
		openDetailModal: (state, action: PayloadAction<number>) => {
			state.contentDetailModalId = action.payload;
			state.contentDetailModalShown = true;
		}
	},
});

export const { openUpdateModal, setUpdateModalShown, openDetailModal, setDetailModalShown} = listActionSlice.actions;
export default listActionSlice;