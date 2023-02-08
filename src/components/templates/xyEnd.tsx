import React from "react";
import { Box, BoxProps } from "@mui/material";
export const XYEnd = (props: BoxProps & { children: React.ReactNode }) => {
	const { children , ...rest } = props;
	return <Box display={"flex"} justifyContent="flex-end" alignItems="flex-end" {...rest}>
		{children}
	</Box>;
};