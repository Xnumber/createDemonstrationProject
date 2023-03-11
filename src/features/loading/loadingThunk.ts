import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoadingEvent } from "./type";
import { loadingTimeout } from "./const";

export const hideLoadingThunk = createAsyncThunk<
	LoadingEvent, LoadingEvent
>(
	"loading/hideLoadingThunk",
	async (loadingEvent) => {
		const result = new Promise<LoadingEvent>(res => {
			setTimeout(() => {
				res(loadingEvent);
			}, loadingTimeout);
		});
		return result;
	}
);