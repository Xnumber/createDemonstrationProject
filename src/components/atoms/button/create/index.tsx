import React from "react";
import { IconButtonProps } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";

export function CreateButton(props: IconButtonProps) {
	const { onClick } = props;
	return <IconButton onClick={onClick} aria-label="create">
		<AddCircleOutlineIcon fontSize="large" htmlColor="var(--md-sys-color-primary)" />
	</IconButton>;
}