import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { Checkbox, Typography } from "@mui/material";
import { toggleDisplayEventsLonger } from "./loadingSlice";
import { YCenter } from "templates/yCenter";
import { useTranslation } from "react-i18next";

export const LoadingEventController = () => {
	const displayEventsLonger = useAppSelector(state => state.loading.displayEventsLonger);
	const dispatch = useAppDispatch();
	const handleDisplayEventsLonger = useCallback(() => { dispatch(toggleDisplayEventsLonger());}, []);
	const { t } = useTranslation("home");

	return <label>
		<YCenter sx={{cursor: "pointer"}}>
			<Checkbox checked={displayEventsLonger} onClick={handleDisplayEventsLonger}/>
			<Typography variant="body1">
				{t("display-events-longer")}
			</Typography>
		</YCenter>
	</label>;
};