import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { weightedData } from "./const";
import { KLines } from "./lib/kLines";
import "./style.scss";
import { CrossHair } from "./lib/crossHair";
import { StockChartHeader } from "./lib/header";

function getElementSize(element: HTMLElement) {
	const width = element.offsetWidth;
	const height = element.offsetHeight;
	return { width, height };
}

const _StockChart = () => {
	const kLines = useRef<KLines|null>(null);
	const crossHair = useRef<CrossHair|null>(null);
	const stockChartHeader = useRef<StockChartHeader|null>(null);
	const chartCanvas = useRef<HTMLCanvasElement>(null);
	const foregroundCanvasRef = useRef<HTMLCanvasElement>(null);
	const chartHeaderCanvasRef = useRef<HTMLCanvasElement>(null);
	
	useEffect(() => {
		if (
			chartHeaderCanvasRef.current &&
			chartCanvas.current &&
			foregroundCanvasRef.current &&
			chartCanvas.current.getContext("2d") && 
			chartCanvas.current.parentElement
		) {
			const bodySize = getElementSize(document.body);
			const wrapperSize = getElementSize(chartCanvas.current.parentElement);
			chartCanvas.current.width = wrapperSize.width;
			chartCanvas.current.height = bodySize.height;
			foregroundCanvasRef.current.width = wrapperSize.width;
			foregroundCanvasRef.current.height = bodySize.height;
			chartHeaderCanvasRef.current.width = wrapperSize.width;
			chartHeaderCanvasRef.current.height = 100;
			kLines.current = new KLines(chartCanvas.current, weightedData);
			crossHair.current = new CrossHair(foregroundCanvasRef.current, chartCanvas.current);
			stockChartHeader.current = new StockChartHeader(chartHeaderCanvasRef.current, kLines.current, foregroundCanvasRef.current);
		} else {
			alert("不支援CanvasRenderingContext2D");
		}
	}, []);

	return <Box>
		<div>
			<canvas className="o-stockChart__header" ref={chartHeaderCanvasRef}></canvas>
		</div>
		<div>
			<canvas className="o-stockChart__kLine" ref={chartCanvas}></canvas>
			<canvas className="o-stockChart__foreground" ref={foregroundCanvasRef}></canvas>
		</div>
	</Box>; 
};

export const StockChart = React.memo(_StockChart);