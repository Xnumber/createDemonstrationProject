import { CollapseMenuItem } from "organisms/collapseMenu/typing";
import type HomeEn from "src/app/language/locales/en/home.json";

export const menu: CollapseMenuItem<keyof typeof HomeEn>[] = [
	{
		label: "canvas-stock",
		url: "/example-features/canvas-stock",
		activateLoading: true
	},
	{
		label: "weather-forecast",
		url: "/example-features/weather-forecast",
		activateLoading: true
	},
	{
		label: "water",
		url: "/example-features/water",
		activateLoading: true
	},
	{
		label: "simple-content-management",
		url: "/example-features/simple-content-management",
		activateLoading: true
	},
];

// https://unsplash.com/photos/OWkXt1ikC5g
export const bkgUrl = "https://images.unsplash.com/photo-1496112576525-8b31e9ce4872?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";