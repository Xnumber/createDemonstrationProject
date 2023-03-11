import { showLoading } from "features/loading/loadingSlice";
import { hideLoadingThunk } from "features/loading/loadingThunk";
import {store} from "src/app/store";
export const loading = (event: string, message?: string) => store.dispatch(showLoading({
	event: event,
	message: message ? message: ""
}));
export function disableLoading(event: string, message?: string) {
	store.dispatch(hideLoadingThunk({
		event: event,
		message: message ? message: ""
	}));
}