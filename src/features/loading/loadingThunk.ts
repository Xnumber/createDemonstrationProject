import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoadingEvent } from "./type";
export const hideLoadingThunk = createAsyncThunk<
	LoadingEvent, LoadingEvent
>(
	"loading/hideLoadingThunk",
	async (loadingEvent) => {
		const result = new Promise<LoadingEvent>(res => {
			setTimeout(() => {
				res(loadingEvent);
			}, 3000);
		});
		return result;
	}
);