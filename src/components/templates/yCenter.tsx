import React from "react";
import { Box, BoxProps } from "@mui/material";
export const YCenter = (props: BoxProps & { children: React.ReactNode }) => {
	const { children , ...rest } = props;
	return <Box display={"flex"} alignItems="center" {...rest}>
		{children}
	</Box>;
};