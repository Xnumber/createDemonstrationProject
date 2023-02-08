import React from "react";
import { RouteObject } from "react-router-dom";
import Home from "pages/home";
// const Contact = React.lazy(() => import("src/components/pages/contact"));
export const routes: (RouteObject & { name: string })[] =  [
	{
		name: "home",
		path: "/:lng",
		element: <Home />
	},
];