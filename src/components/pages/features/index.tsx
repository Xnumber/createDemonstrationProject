import { CollapseMenu } from "organisms/collapseMenu";
import { Typography, Box } from "@mui/material";
import React from "react";
import { menu } from "./const";
import { useTranslation } from "react-i18next";
import { XCenter } from "templates/xCenter";

const Features = () => {
	const { t } = useTranslation("home");
	const translatedMenu = menu.map(o => ({...o, label: t(o.label)}));
	
	return <div className="p-features">
		<Box className="p-features__content">
			<XCenter zIndex={2}>
				<Typography variant="h1">
					{t("example-features")}
				</Typography>
			</XCenter>
			<CollapseMenu
				items={translatedMenu}
			/>
		</Box>
	</div>;
};

export default Features;