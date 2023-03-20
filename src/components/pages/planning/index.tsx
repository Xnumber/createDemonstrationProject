import { CollapseMenu } from "organisms/collapseMenu";
import { Typography, Box } from "@mui/material";
import React from "react";
import { menu } from "./const";
import { useTranslation } from "react-i18next";
import { XCenter } from "templates/xCenter";

const Planning = () => {
	const { t } = useTranslation("home");
	const translatedMenu = menu.map(o => ({...o, label: t(o.label)}));
	
	return <div>
		<Box>
			<XCenter zIndex={2}>
				<Typography variant="h1">
					{t("planning")}
				</Typography>
			</XCenter>
			<CollapseMenu
				items={translatedMenu}
			/>
		</Box>
	</div>;
};

export default Planning;