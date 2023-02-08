import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import IconButton from "@mui/material/IconButton";

export const ThemeToggler = (props: { 
	mode: "dark" | "light",
	onclick: React.ReactEventHandler<HTMLButtonElement>
}) => {
	const { mode, onclick } = props;

	return <IconButton onClick={onclick}>
		{
			mode === "dark" ? <LightModeIcon  htmlColor="var(--md-sys-color-on-background)"/>: <DarkModeIcon htmlColor="var(--md-sys-color-on-background)"/>
		}
	</IconButton>;
};