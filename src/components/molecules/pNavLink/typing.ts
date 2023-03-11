// import { NavigateOptions, To } from "react-router-dom";

export type PNavLinkProps = {
	text: string;
	url?:  string;
	callback?: () => void;
	delay?: number;
	hover?: boolean;
	activateLoading?: boolean;
	event?: string;
	disable?: boolean;
	fontSize?: string;
};