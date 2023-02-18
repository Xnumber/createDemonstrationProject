import React, { useRef, useEffect } from "react";
import type { RootState } from "store";
import { useAppSelector } from "src/app/hooks";
import { toggleTheme } from "./themeControllerSlice";
import { ThemeToggler } from "atoms/themeToggler";
import { useDispatch } from "react-redux";

const ThemeController = () => {
	const theme = useAppSelector((state: RootState) => state.theme.mode);
	const dispatch = useDispatch();
	const bodyRef = useRef<HTMLBodyElement>();

	useEffect(() => {
		bodyRef.current = document.body as HTMLBodyElement;
		bodyRef.current.setAttribute("class", theme);
	}, [theme]);

	const handleToggleTheme = () => {
		dispatch(toggleTheme());
	};

	return <ThemeToggler onclick={handleToggleTheme} mode={theme}/>;
};

export default ThemeController;