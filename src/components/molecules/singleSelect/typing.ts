import { SelectProps } from "@mui/material";

type Options = {
	label: string;
	value: string;
}[]

export type MultiSelectProps = SelectProps & {
	options: Options
	callback?: (e: string | string[]) => void;
	defaultSelected?: string
};