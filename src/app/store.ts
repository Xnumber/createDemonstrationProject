import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { ThemeControllerSlice, LoadingSlice } from "features/index";
import { weatherApi } from "service/weather/api";
import { WeatherChartLegendSlice} from "features/chart/weatherLegend";
import { waterApi } from "service/water/api";
import { waterSlice } from "features/water/waterSlice";
export const store = configureStore({
	reducer: {
		[ThemeControllerSlice.name]: ThemeControllerSlice.reducer,
		[LoadingSlice.name]: LoadingSlice.reducer,
		[weatherApi.reducerPath]: weatherApi.reducer,
		[WeatherChartLegendSlice.name]: WeatherChartLegendSlice.reducer,
		[waterApi.reducerPath]: waterApi.reducer,
		[waterSlice.name]: waterSlice.reducer
	},
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherApi.middleware).concat(waterApi.middleware)
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch