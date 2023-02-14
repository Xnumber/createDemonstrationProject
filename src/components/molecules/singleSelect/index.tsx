import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SingleSelectProps } from "./typing";
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

export function SingleSelect(props: SingleSelectProps) {
	const { options, callback, label, defaultSelected, ...rest } = props;
	const [selected, setSelected] = React.useState<string>(defaultSelected ? defaultSelected: "");
	
	const handleChange = (event: SelectChangeEvent<typeof selected>) => {
		const {
			target: { value },
		} = event;
		setSelected(value);
		callback?.(value);
	};

	return <FormControl sx={{ m: 1 }}>
		<InputLabel sx={{ background: "white", padding: "0 0.5rem" }}>{ label }</InputLabel>
		<Select
			{...rest}
			value={selected}
			onChange={handleChange}
			input={<OutlinedInput label="Name" />}
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
