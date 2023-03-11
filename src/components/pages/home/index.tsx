import { CollapseMenu } from "organisms/collapseMenu";
import React from "react";
import { mainMenu } from "./const";
import { useTranslation } from "react-i18next";
import "./style.scss";

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
		<CollapseMenu
			items={translatedMenu}
		/>
	</div>;
};

export default Home;