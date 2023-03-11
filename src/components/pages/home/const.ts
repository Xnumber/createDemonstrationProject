import type HomeEn from "src/app/language/locales/en/home.json";

export type HomeCollapseMenuItem = {
	label: keyof typeof HomeEn;
	url: string;
	activateLoading?: boolean;
}

export const mainMenu: HomeCollapseMenuItem[] = [
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
];