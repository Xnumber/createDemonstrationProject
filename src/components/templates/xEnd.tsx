import React from "react";
import { Box, BoxProps } from "@mui/material";
export const XEnd = (props: BoxProps & { children: React.ReactNode }) => {
	const { children , ...rest } = props;
	return <Box display={"flex"} justifyContent="flex-end" {...rest}>
		{children}
	</Box>;
};