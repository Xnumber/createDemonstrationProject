import React from "react";
import { Box, BoxProps } from "@mui/material";
export const YEnd = (props: BoxProps & { children: React.ReactNode }) => {
	const { children , ...rest } = props;
	return <Box display={"flex"} alignItems="flex-end" {...rest}>
		{children}
	</Box>;
};