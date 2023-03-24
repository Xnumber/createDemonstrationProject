import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoadingEvent, LoadingState } from "./type";
export const hideLoadingThunk = createAsyncThunk<
	LoadingEvent, LoadingEvent, { state: { loading: LoadingState } }
>(
	"loading/hideLoadingThunk",
	async (loadingEvent, thunkAPI) => {
		const displayEventsLonger = thunkAPI.getState().loading.displayEventsLonger;
		
		const result = new Promise<LoadingEvent>(res => {
			setTimeout(() => {
				res(loadingEvent);
			}, displayEventsLonger ? 3000: 0);
		});
		return result;
	}
);