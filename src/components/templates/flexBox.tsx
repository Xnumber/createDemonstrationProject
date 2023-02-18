import React from "react";
import { Box, BoxProps } from "@mui/material";
export const FlexBox = (props: BoxProps & { children: React.ReactNode }) => {
	const { children , ...rest } = props;
	return <Box display={"flex"} {...rest}>
		{children}
	</Box>;
};