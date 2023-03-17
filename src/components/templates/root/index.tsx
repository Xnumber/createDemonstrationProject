import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { XBetween } from "..";
import ThemeController from "features/theme/themeController";
import { LanguageToggler } from "atoms/languageToggler";

const Root = () => {
	const location = useLocation();
	const navigate = useNavigate();
	
	useEffect(() => {
		if (location.pathname === "/") {
			navigate("/zh");
		}
	}, [location.pathname]);
	return <>
		<React.Suspense fallback={false}>
			<Outlet />
		</React.Suspense>
		<XBetween p={3} left={0} width={"100%"} position={"fixed"} bottom={0}>
			<ThemeController />
			<LanguageToggler />
		</XBetween>
	</>;
};

export default Root;