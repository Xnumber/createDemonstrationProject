import React from "react";
import { IconButtonProps } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
export function DetailButton(props: IconButtonProps) {
	const { onClick } = props;

	return <IconButton 
		sx={{ background: "var(--md-sys-color-primary)", "&:hover": { background: "var(--md-sys-color-primary)" }}} 
		onClick={onClick} aria-label="delete"
	>
		<FeaturedPlayListIcon 
			htmlColor="var(--md-sys-color-on-primary)"
			fontSize="small"
		/>
	</IconButton>;
}