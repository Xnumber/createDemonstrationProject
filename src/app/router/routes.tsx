import React, { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Home from "pages/home";
import { Water } from "pages/water/indext";
import { SimpleContentManagement } from "pages/simpleContentManagement";
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