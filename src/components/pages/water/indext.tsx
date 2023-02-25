import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { useTranslation } from "react-i18next";
import { Liquids } from "features/water/liquids";
import { XCenter } from "templates/xCenter";
import { WaterCondition } from "features/index";
import { useAppSelector } from "src/app/hooks";
import { WaterChart } from "features/water/chart";

export function Water() {
	const { t } = useTranslation("water");
	const modeChosen = useAppSelector(state => state.water.condition.modeChosen);
	return <>
		<Typography variant="h1">
			{t("storage-ratio")}
		</Typography>
		<WaterCondition />
		<Grid2 container columns={12}>
			<Grid2 xs={12}>
				<XCenter>
					<Typography variant="h2">
						{t(modeChosen[0] === "single" ? "single": "compare")}
					</Typography>
				</XCenter>
			</Grid2>
		</Grid2>
		{
			modeChosen[0] === "single" ? <Liquids />: <WaterChart />
		}
	</>;
}