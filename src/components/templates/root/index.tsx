import React from "react";
import { Outlet } from "react-router-dom";
import { XBetween } from "..";
import ThemeController from "features/theme/themeController";
import { LanguageToggler } from "atoms/languageToggler";
const Root = () => {

	return <><Outlet />
		<XBetween>
			<ThemeController />
			<LanguageToggler />
		</XBetween>
	</>;
};

export default Root;