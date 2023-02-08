import React, { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Home from "pages/home";
// const Contact = React.lazy(() => import("src/components/pages/contact"));
const WeatherForecast = lazy(() => import("pages/weatherForecast"));

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
];