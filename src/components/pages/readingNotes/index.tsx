import { CollapseMenu } from "organisms/collapseMenu";
import { Typography, Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { menu } from "./const";
import { useTranslation } from "react-i18next";
import { XCenter } from "templates/xCenter";
import "./style.scss";
const ReadingNotes = () => {
	const { t } = useTranslation("home");
	const bkgRef = useRef<HTMLElement>(null); 
	useEffect(() => {
		const bkg = new Image();
		bkg.src = "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
		bkg.onload = () => {
			if (bkgRef.current) {
				bkgRef.current.style.opacity = "0.75";
				bkgRef.current.style.filter = "blur(6px)";
			}
		};
	}, []);
	return <div className="p-readingNotes">
		<Box
			
			ref={bkgRef}
			sx={{ 
				filter: "blur(20px)",
				opacity: 0,
				backgroundImage: "url(\"https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\")"
			}} 
			className="p-readingNotes__background"
		>

		</Box>
		<Box className="p-readingNotes__content">
			<XCenter zIndex={2}>
				<Typography variant="h1">
					{t("reading-notes")}
				</Typography>
			</XCenter>
			<CollapseMenu
				items={menu}
			/>
		</Box>
	</div>;
};
export default ReadingNotes;