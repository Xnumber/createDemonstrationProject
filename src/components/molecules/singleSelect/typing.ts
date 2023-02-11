import { SelectProps } from "@mui/material";

type Options = {
	label: string;
	value: string;
}[]

export type SingleSelectProps = SelectProps & {
	options: Options
	callback?: (e: string) => void;
	defaultSelected?: string
};