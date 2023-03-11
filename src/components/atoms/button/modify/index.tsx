import React from "react";
import { IconButtonProps } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

export function ModifyButton(props: IconButtonProps) {
	const { onClick } = props;
	
	return <IconButton sx={{ background: "var(--md-sys-color-tertiary)", "&:hover": { background: "var(--md-sys-color-tertiary)" }}} onClick={onClick} aria-label="modify">
		<EditIcon fontSize="small" htmlColor="var(--md-sys-color-on-tertiary)" />
	</IconButton>;
}