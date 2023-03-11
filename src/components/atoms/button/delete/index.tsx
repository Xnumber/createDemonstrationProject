import React from "react";
import { IconButtonProps } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export function DeleteButton(props: IconButtonProps) {
	const { onClick } = props;

	return <IconButton 
		sx={{ background: "var(--md-sys-color-error)", "&:hover": { background: "var(--md-sys-color-error)" }}} 
		onClick={onClick} aria-label="delete"
	>
		<DeleteForeverIcon 
			htmlColor="var(--md-sys-color-on-error)"
			fontSize="small"
		/>
	</IconButton>;
}