import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { XBetween } from "..";
import ThemeController from "features/theme/themeController";
import { LanguageToggler } from "atoms/languageToggler";
import { Background } from "organisms/background";
import { Box } from "@mui/material";

const Root = () => {
	const location = useLocation();
	const navigate = useNavigate();
	
	useEffect(() => {
		if (location.pathname === "/") {
			navigate("/zh");
		}
	}, [location.pathname]);
	
	return <>
		<Background />
		<React.Suspense fallback={false}>
			<Box position={"relative"}>
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