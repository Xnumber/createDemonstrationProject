import { hideLoading } from "features/loading/loadingSlice";
import {store} from "src/app/store";
export const hideChangeRouteLoading = () => {
	store.dispatch(hideLoading({ event: "change-route-loading", message: ""}));
};