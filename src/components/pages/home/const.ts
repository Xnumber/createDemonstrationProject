import { CollapseMenuItem } from "organisms/collapseMenu/typing";
import type HomeEn from "src/app/language/locales/en/home.json";

export const mainMenu: CollapseMenuItem<keyof typeof HomeEn>[] = [
	{
		label: "example-features",
		url: "/example-features",
		activateLoading: true
	},
	// {
	// 	label: "planning",
	// 	url: "/planning",
	// 	activateLoading: true
	// },
	{
		label: "about",
		url: "/about",
		activateLoading: true
	}
];