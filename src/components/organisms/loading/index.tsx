import React, { memo } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";

const _LoadingBackdrop = (props: { loading: boolean }) => {
	const { loading } = props;
	return <Backdrop open={loading}>
		<CircularProgress />
	</Backdrop>;
};

export const LoadingBackdrop = memo(_LoadingBackdrop);