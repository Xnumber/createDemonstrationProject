import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { XBetween } from "..";
import ThemeController from "features/theme/themeController";
import { LanguageToggler } from "atoms/languageToggler";
import { Background } from "organisms/background";
import { Box } from "@mui/material";
import { routes } from "src/app/router/routes";
import { menu } from "./const";

const Root = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const currentPageName = routes.find(r => r.path?.replace("/:lng", "") === location.pathname.replace(/\/zh|\/en/, ""))?.name;
	
	useEffect(() => {
		if (location.pathname === "/") {
			navigate("/zh");
		}
	}, [location.pathname]);
	
	const isMenuType = currentPageName ? menu.indexOf(currentPageName) !== -1: false;
	const pt = isMenuType ? "6rem": 0;

	return <>
		<Background />
		<React.Suspense fallback={false}>
			<Box pt={pt} position={"relative"}>
				<Outlet />
			</Box>
		</React.Suspense>
		<XBetween p={3} left={0} width={"100%"} position={"fixed"} bottom={0}>
			<ThemeController />
			<LanguageToggler />
		</XBetween>
	</>;
};

export default Root;