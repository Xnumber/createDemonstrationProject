import { CollapseMenuItem } from "organisms/collapseMenu/typing";
import type HomeEn from "src/app/language/locales/en/home.json";

export const mainMenu: CollapseMenuItem<keyof typeof HomeEn>[] = [
	{
		label: "weather-forecast",
		url: "/weather-forecast",
		activateLoading: true
	},
	{
		label: "water",
		url: "/water",
		activateLoading: true
	},
	{
		label: "simple-content-management",
		url: "/simple-content-management",
		activateLoading: true
	},
	{
		label: "reading-notes",
		url: "/reading-notes",
		activateLoading: true
	},
	{
		label: "planning",
		url: "/planning",
		activateLoading: true
	}
];