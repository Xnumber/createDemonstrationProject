import { CollapseMenu } from "organisms/collapseMenu";
import { Typography, Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { bkgUrl, menu } from "./const";
import { useTranslation } from "react-i18next";
import { XCenter } from "templates/xCenter";
import "./style.scss";
const Planning = () => {
	const { t } = useTranslation("home");
	const bkgRef = useRef<HTMLElement>(null);
	const translatedMenu = menu.map(o => ({...o, label: t(o.label)}));
	useEffect(() => {
		const bkg = new Image();
		bkg.src = bkgUrl;
		bkg.onload = () => {
			if (bkgRef.current) {
				bkgRef.current.style.opacity = "0.75";
				bkgRef.current.style.filter = "blur(2px)";
			}
		};
	}, []);
	return <div className="p-planning">
		<Box
			ref={bkgRef}
			sx={{ 
				filter: "blur(20px)",
				opacity: 0,
				backgroundImage: `url(${bkgUrl})`
			}} 
			className="p-planning__background"
		>
		</Box>
		<Box className="p-planning__content">
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