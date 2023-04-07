import React, { memo } from "react";
import { Backdrop, CircularProgress, Typography, Box, Portal } from "@mui/material";
import { XCenter } from "templates/xCenter";
import Cookies from "js-cookie";
import { LoadingState } from "features/loading/type";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/app/hooks";
const _LoadingBackdrop = (props: { events: LoadingState["loadingQueue"] }) => {
	const { events } = props;
	const xsrfToken = Cookies.get("XSRF-TOKEN");
	const { t } = useTranslation("home");
	const displayEventsLonger = useAppSelector(state => state.loading.displayEventsLonger);
	
	return <Portal container={document.body}>
		<Backdrop open={events.length !== 0}>
			{
				events.length === 1 && events[0].event === "Complete"  ? <Typography variant="h2" color={"#fff"}>
					{t("loading-complete")}
				</Typography>: 
					<Box width={"100%"}>
						<XCenter mb={3}>
							<CircularProgress size={60}/>
						</XCenter>
						<Box mb={2}>
							{
								events.length && xsrfToken ? <>
									<Typography variant="h5" color={"#fff"}>
										XSRF-TOKEN
									</Typography>
									<Typography fontSize={"12px"} style={{ wordWrap: "break-word"}} maxWidth={"600px"} variant="body1" color={"#fff"}>
										{xsrfToken}
									</Typography></>: null
							}
						</Box>
						{
							displayEventsLonger ?
								<XCenter mb={2}>
									<Typography p={1} sx={{ background: "var(--md-sys-color-primary)"}} maxWidth={"600px"} variant="body1" color={"var(--md-sys-color-on-primary)"}>
										{t("common-loading-message")}
									</Typography>
								</XCenter>: null
						}
						<XCenter>
							{
								events.map((o, i) => {
									return <Box key={i}>
										<Typography variant="h5" color={"#fff"}>
											{t("event")}: {o.event}
										</Typography>
										<Typography variant="h6" color={"#fff"}>
											{o.message}
										</Typography>
									</Box>;
								})
							}
						</XCenter>
					</Box>
			}
		</Backdrop>
	</Portal>;
};

export const LoadingBackdrop = memo(_LoadingBackdrop);