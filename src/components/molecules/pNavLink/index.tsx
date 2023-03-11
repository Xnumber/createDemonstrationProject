import React, { useCallback } from "react";
import { Typography } from "@mui/material";
import { PNavLinkProps } from "./typing";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { showLoading } from "features/loading/loadingSlice";
import { useAppDispatch } from "src/app/hooks";
const _PNavLink = (props: PNavLinkProps) => {
	const { text, callback, delay, url, hover, activateLoading, event, disable, fontSize } = props;
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const onclick: React.ReactEventHandler | undefined = !disable ? useCallback((e: React.SyntheticEvent) => {
		e.preventDefault();
		callback?.();

		if (url && activateLoading) {
			// alert("loading");
			dispatch(showLoading({ event: "Change Route", message: "" }));
		}

		if (activateLoading && event) {
			dispatch(showLoading({ event: event, message: "" }));
		}

		setTimeout(() => {
			url ? navigate(url): null;
		}, delay ? delay: 0);
	}, [text, url, callback, delay]): undefined;

	return <a onClick={onclick} href={url} className={`${disable ? "": "hover-cursor-pointer"}`}>
		<div className="m-pNavLink">
			<Typography
				variant="h6"
				color="var(--md-sys-color-on-background)"
				// className="d-inline"
				fontSize={fontSize}
				component={"span"}
			>
				{text}
			</Typography>
			<div className={`m-pNavLink__decorator${hover ? " m-pNavLink__decorator--dummyHover": ""}`}></div>
		</div>
	</a>; 
};

export const PNavLink = React.memo(_PNavLink);