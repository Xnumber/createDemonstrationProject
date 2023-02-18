import * as React from "react";
import { useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MultiSelectProps } from "./typing";
import { ProjectInput } from "atoms/projectInput";

const ITEM_HEIGHT = 60;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

export function MultipleSelect(props: MultiSelectProps) {
	const { options, callback, label, defaultSelected, ...rest } = props;
	const [selected, setSelected] = React.useState<string[]>(defaultSelected ? defaultSelected: []);
	const handleChange = (event: SelectChangeEvent<typeof selected>) => {
		const {
			target: { value },
		} = event;
		setSelected(
			typeof value === "string" ? value.split(",") : value,
		);
		callback?.(value);
	};

	useEffect(() => {
		setSelected(defaultSelected ? defaultSelected: []);
	}, [defaultSelected]);

	return <FormControl>
		<InputLabel>{ label }</InputLabel>
		<Select
			{...rest}
			multiple
			value={selected}
			onChange={handleChange}
			input={<ProjectInput />}
			MenuProps={MenuProps}
		>
			{options.map((o, i) => (
				<MenuItem
					key={i}
					value={o.value}
				>
					{o.label}
				</MenuItem>
			))}
		</Select>
	</FormControl>;

}
