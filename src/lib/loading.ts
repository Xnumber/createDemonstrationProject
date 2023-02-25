import { hideLoading, showLoading } from "features/loading/loadingSlice";
import {store} from "src/app/store";
export const loading = (event: string, message?: string) => store.dispatch(showLoading({
	event: event,
	message: message ? message: ""
}));
export function disableLoading(event: string, message?: string) {
	store.dispatch(hideLoading({
		event: event,
		message: message ? message: ""
	}));
}