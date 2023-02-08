import { showLoading } from "features/loading/loadingSlice";
import {store} from "src/app/store";

export const loading = (event: string, message?: string) => store.dispatch(showLoading({
	event: event,
	message: message ? message: ""
}));