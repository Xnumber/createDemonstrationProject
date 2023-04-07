import React, { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { withCloseLoadingOnMount } from "./utils";
const WeatherForecast = withCloseLoadingOnMount(lazy(() => import("pages/weatherForecast")));
const Home = lazy(() => import("pages/home"));
const Features = withCloseLoadingOnMount(lazy(() => import("pages/features")));
const Water = withCloseLoadingOnMount(lazy(() => import("pages/water")));
const SimpleContentManagement = withCloseLoadingOnMount(lazy(() => import("pages/simpleContentManagement")));
const ReadingNotes = withCloseLoadingOnMount(lazy(() => import("pages/readingNotes")));
// const Planning = withCloseLoadingOnMount(lazy(() => import("pages/planning")));
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
			name: "example-features",
			path: "/:lng/example-features",
			element: <Features />
		},
		{
			name: "weather-forecast",
			path: "/:lng/example-features/weather-forecast",
			element: <WeatherForecast />
		},
		{
			name: "water",
			path: "/:lng/example-features/water",
			element: <Water />
		},
		{
			name: "simple-content-management",
			path: "/:lng/example-features/simple-content-management",
			element: <SimpleContentManagement />
		},
		{
			name: "reading-notes",
			path: "/:lng/reading-notes",
			element: <ReadingNotes />
		},
		// {
		// 	name: "planning",
		// 	path: "/:lng/planning",
		// 	element: <Planning />
		// },
		{
			name: "about",
			path: "/:lng/about",
			element: <About />
		},
	];