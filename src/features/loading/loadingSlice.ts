import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { hideLoadingThunk } from "./loadingThunk";
import { LoadingState } from "./type";

const displayEventsLonger = localStorage.getItem("display-events-longer");

const initialState: LoadingState = {
	loadingQueue: [],
	loading: false,
	displayEventsLonger: displayEventsLonger ? JSON.parse(displayEventsLonger): true
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
		toggleDisplayEventsLonger: (state) => {
			state.displayEventsLonger = !state.displayEventsLonger;
			localStorage.setItem("display-events-longer", JSON.stringify(state.displayEventsLonger));
		}
	},
	extraReducers: (builder) => {
		builder.addCase(hideLoadingThunk.fulfilled, (state, action) => {
			
			state.loadingQueue = state.loadingQueue.filter(o => action.payload.event !== o.event);
			
			if (state.loadingQueue.length === 0) {
				state.loadingQueue.push({ event: "Complete", message: ""});
			}

			if (state.loadingQueue.length === 1 && action.payload.event === "Complete") {
				state.loadingQueue = [];
			}
		});
	},
});

export const { showLoading, hideLoading, toggleDisplayEventsLonger } = loadingSlice.actions;
export default loadingSlice;