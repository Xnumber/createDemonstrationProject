import React, { useMemo, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "src/app/language/i18n";
import { router } from "./app/router/router";
import "./style/app.scss";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "./lib/style/style";
import { useAppSelector } from "./app/hooks";
import Loading from "features/loading";
import { Box, Container } from "@mui/material";
import "./style/app.scss";

const App = () => {
	const mode = useAppSelector(state => state.theme.mode);
	const theme = useMemo(() => getTheme(), [mode]);
	const bodyRef = useRef<HTMLBodyElement>();
	
	useEffect(() => {
		bodyRef.current = document.body as HTMLBodyElement;
	}, []);

	return <ThemeProvider theme={theme}>
		<CssBaseline />
		<Box minHeight={"100%"} className={"background"}>
			<Container sx={{ paddingTop: "16px", paddingBottom: "60px" }}>
				<RouterProvider router={router}/>
				<Loading />
			</Container>
		</Box>
	</ThemeProvider>;
};

const BuildApp = () => {
	const rootElement = document.getElementById("root");
	
	if (rootElement) {
		const root = ReactDOM.createRoot(rootElement);
		root.render(
			<Provider store={store}>
				<App />
			</Provider>
		);
	}
};

BuildApp();