import React from "react";
import { Box, BoxProps } from "@mui/material";
export const XBetween = (props: BoxProps & { children: React.ReactNode }) => {
	const { children , ...rest } = props;
	return <Box display={"flex"} justifyContent="space-between" {...rest}>
		{children}
	</Box>;
};