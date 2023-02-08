import React from "react";
import { Box, BoxProps } from "@mui/material";
export const XYCenter = (props: BoxProps & { children: React.ReactNode }) => {
	const { children , ...rest } = props;
	return <Box display={"flex"} justifyContent="center" alignItems={"center"} {...rest}>
		{children}
	</Box>;
};