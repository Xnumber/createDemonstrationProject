import { CollapseMenuProps } from "organisms/collapseMenu/typing";
export const menu: CollapseMenuProps["items"] = [
	{
		label: "work-flow",
		url: "/",
		activateLoading: true
	},
	{
		label: "requirement",
		url: "/planning/requirement",
		activateLoading: true
	},
	{
		label: "programming",
		url: "/planning/programming",
		activateLoading: true
	},
];

// https://unsplash.com/photos/OWkXt1ikC5g
export const bkgUrl = "https://images.unsplash.com/photo-1496112576525-8b31e9ce4872?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";