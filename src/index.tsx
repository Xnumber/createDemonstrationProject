import React, { useMemo } from "react";
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
// import "./style/properties/index.scss";
import { useAppSelector } from "./app/hooks";
import Loading from "features/loading";
import { Box } from "@mui/material";
import "./style/app.scss";

const App = () => {
	const mode = useAppSelector(state => state.theme.mode);
	const theme = useMemo(() => getTheme(), [mode]);
	// alert("123");
	return <ThemeProvider theme={theme}>
		<CssBaseline />
		<Box className={`${mode} background`} height={"100%"}>
			<RouterProvider router={router}/>
			<Loading />
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