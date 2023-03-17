import React, { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { withCloseLoadingOnMount } from "./utils";
const WeatherForecast = withCloseLoadingOnMount(lazy(() => import("pages/weatherForecast")));
const Home = lazy(() => import("pages/home"));
const Water = withCloseLoadingOnMount(lazy(() => import("pages/water")));
const SimpleContentManagement = withCloseLoadingOnMount(lazy(() => import("pages/simpleContentManagement")));

export const routes: (RouteObject & { name: string })[] =  [
	{
		name: "home",
		path: "/:lng",
		element: <Home />
	},
	{
		name: "weather-forecast",
		path: "/:lng/weather-forecast",
		element: <WeatherForecast />
	},
	{
		name: "water",
		path: "/:lng/water",
		element: <Water />
	},
	{
		name: "simple-content-management",
		path: "/:lng/simple-content-management",
		element: <SimpleContentManagement />
	},
];