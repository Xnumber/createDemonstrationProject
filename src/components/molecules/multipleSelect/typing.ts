import { SelectProps } from "@mui/material";
// import { LanguageResourceContentKey, LanguageResourceKey } from "src/app/language/typing";
type Options = {
	label: string;
	value: string;
}[]

export type MultiSelectProps = SelectProps & {
	options: Options
	callback?: (e: string | string[]) => void;
};