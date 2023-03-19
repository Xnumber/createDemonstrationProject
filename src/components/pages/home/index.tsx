import { CollapseMenu } from "organisms/collapseMenu";
import { Typography } from "@mui/material";
import React from "react";
import { mainMenu } from "./const";
import { useTranslation } from "react-i18next";
import "./style.scss";
import { XCenter } from "templates/xCenter";

const Home = () => {
	const { t } = useTranslation("home");
	
	const translatedMenu = mainMenu.map(o => {
		return {
			label: t(o.label),
			url: o.url,
			activateLoading: o.activateLoading
		};
	});

	return <div className="p-home">
		<XCenter zIndex={2}>
			<Typography variant="h1">
				{t("react-project-example")}
			</Typography>
		</XCenter>
		<CollapseMenu
			items={translatedMenu}
		/>
	</div>;
};

export default Home;