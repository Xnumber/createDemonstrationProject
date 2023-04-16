import React from "react";
import { Box } from "@mui/material";
import { StockChart } from "organisms/stockChart";

const Stock = () => {
	return <Box className="p-stock">
		<StockChart />;
	</Box>;
};
export default Stock;