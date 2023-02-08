import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "templates/root";
import { routes } from "./routes";
export const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: routes
	}
]);