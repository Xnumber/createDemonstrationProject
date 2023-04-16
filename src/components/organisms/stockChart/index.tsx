import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { weightedData } from "./const";
import "./style.scss";
import { useAppSelector } from "src/app/hooks";
import { Chart } from "./lib/chart";

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

	return <Box flex={1} position={"relative"} height={"600px"} ref={chartContainerRef}></Box>;
};

export const StockChart = React.memo(_StockChart);