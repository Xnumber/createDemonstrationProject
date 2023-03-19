import React, { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { withCloseLoadingOnMount } from "./utils";
const WeatherForecast = withCloseLoadingOnMount(lazy(() => import("pages/weatherForecast")));
const Home = lazy(() => import("pages/home"));
const Water = withCloseLoadingOnMount(lazy(() => import("pages/water")));
const SimpleContentManagement = withCloseLoadingOnMount(lazy(() => import("pages/simpleContentManagement")));
const ReadingNotes = withCloseLoadingOnMount(lazy(() => import("pages/readingNotes")));
const Planning = withCloseLoadingOnMount(lazy(() => import("pages/planning")));
const About = withCloseLoadingOnMount(lazy(() => import("pages/about")));

export const routes: (
	RouteObject & { name: string }
	)[] =  [
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
		{
			name: "reading-notes",
			path: "/:lng/reading-notes",
			element: <ReadingNotes />
		},
		{
			name: "planning",
			path: "/:lng/planning",
			element: <Planning />
		},
		{
			name: "about",
			path: "/:lng/about",
			element: <About />
		},
	];