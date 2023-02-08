import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface LoadingState {
  loadingQueue: {
	event: string,
	message: string
  }[];
  loading: boolean;
}

const initialState: LoadingState = {
	loadingQueue: [],
	loading: false,
};

export const loadingSlice = createSlice({
	name: "loading",
	initialState,
	reducers: {
		showLoading: (state, action: PayloadAction<LoadingState["loadingQueue"][number]>) => {
			const loadingEvent = action.payload;
			if (!state.loading) {
				state.loadingQueue.push(loadingEvent);
				state.loading = true;
			} else {
				state.loadingQueue.push(loadingEvent);
			}
		},
		hideLoading: (state, action: PayloadAction<LoadingState["loadingQueue"][number]>) => {
			state.loadingQueue = state.loadingQueue.filter(o => action.payload.event !== o.event);
			if (state.loadingQueue.length === 0) {
				state.loading = false;
			}
		},
	},
});
export const { showLoading, hideLoading } = loadingSlice.actions;
export default loadingSlice;