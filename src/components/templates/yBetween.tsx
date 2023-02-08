import React from "react";
import { Stack, StackProps } from "@mui/material";
export const YBetween = (props: StackProps & { children: React.ReactNode }) => {
	const { children , ...rest } = props;
	return <Stack justifyContent="space-between" {...rest}>
		{children}
	</Stack>;
};