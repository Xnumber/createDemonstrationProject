import React from "react";
import { Box, BoxProps } from "@mui/material";
export const XEndYCenter = (props: BoxProps & { children: React.ReactNode }) => {
	const { children , ...rest } = props;
	return <Box display={"flex"} justifyContent="flex-end" alignItems={"center"} {...rest}>
		{children}
	</Box>;
};