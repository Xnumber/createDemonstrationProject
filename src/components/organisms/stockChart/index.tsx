import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { weightedData } from "./const";
import "./style.scss";
import { useAppSelector } from "src/app/hooks";
import { Chart } from "./lib/chart";
import { Link } from "react-router-dom";
const _StockChart = () => {
	const chartRef = useRef<Chart|null>(null);
	const chartContainerRef = useRef<HTMLDivElement>(null);
	const mode = useAppSelector(state => state.theme.mode);
	const initialRender = useRef(true);
	
	useEffect(() => {
		if (chartRef.current) {
			chartRef.current.setMode(mode);
		}
	}, [mode]);

	useEffect(() => {
		if (chartContainerRef.current) {
			chartRef.current = new Chart(
				chartContainerRef.current,
				weightedData,
				mode,
				["Grid", "KLines"]
			);
		}
	}, []);

	useEffect(() => {
		initialRender.current = false;
		return () => {
			chartRef.current?.destroy();
		};
	}, []);

	return <Box>
		<Link to="/zh">zh</Link>
		<Box position={"relative"} height={"360px"} ref={chartContainerRef}>

		</Box>
	</Box>;
};

export const StockChart = React.memo(_StockChart);