import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { weightedData } from "./const";
import { KLines } from "./lib/kLines";
import "./style.scss";
import { CrossHair } from "./lib/crossHair";
import { StockChartHeader } from "./lib/header";
import { useAppSelector } from "src/app/hooks";
import { MovingAerage } from "./lib/movingAverage";

function getElementSize(element: HTMLElement) {
	const width = element.offsetWidth;
	const height = element.offsetHeight;
	return { width, height };
}

const _StockChart = () => {
	const kLines = useRef<KLines|null>(null);
	const crossHair = useRef<CrossHair|null>(null);
	const stockChartHeader = useRef<StockChartHeader|null>(null);
	const movingAerage = useRef<MovingAerage|null>(null);
	const chartCanvas = useRef<HTMLCanvasElement>(null);
	const foregroundCanvasRef = useRef<HTMLCanvasElement>(null);
	const chartHeaderCanvasRef = useRef<HTMLCanvasElement>(null);
	const movingAerageCanvasRef = useRef<HTMLCanvasElement>(null);
	const mode = useAppSelector(state => state.theme.mode);
	
	useEffect(() => {
		if (
			chartHeaderCanvasRef.current &&
			movingAerageCanvasRef.current &&
			chartCanvas.current &&
			foregroundCanvasRef.current &&
			chartCanvas.current.getContext("2d") && 
			chartCanvas.current.parentElement
		) {
			const wrapperSize = getElementSize(chartCanvas.current.parentElement);
			chartCanvas.current.width = wrapperSize.width;
			chartCanvas.current.height = wrapperSize.height;
			movingAerageCanvasRef.current.width = wrapperSize.width;
			movingAerageCanvasRef.current.height = wrapperSize.height;
			foregroundCanvasRef.current.width = wrapperSize.width;
			foregroundCanvasRef.current.height = wrapperSize.height;
			chartHeaderCanvasRef.current.width = wrapperSize.width;
			chartHeaderCanvasRef.current.height = 100;
			kLines.current = new KLines(chartCanvas.current, weightedData, mode);
			crossHair.current = new CrossHair(foregroundCanvasRef.current, chartCanvas.current, mode);
			stockChartHeader.current = new StockChartHeader(chartHeaderCanvasRef.current, kLines.current, foregroundCanvasRef.current, mode);
			movingAerage.current = new MovingAerage(movingAerageCanvasRef.current, kLines.current, foregroundCanvasRef.current, mode);
		} else {
			alert("不支援CanvasRenderingContext2D");
		}

		return () => {
			kLines.current?.destroy();
			crossHair.current?.destroy();
			stockChartHeader.current?.destroy();
			movingAerage.current?.destroy();
		};
	}, []);

	useEffect(() => {
		crossHair.current?.setMode(mode);
		stockChartHeader.current?.setMode(mode);
		kLines.current?.setMode(mode);
	}, [mode]);

	return <Box>
		<div>
			<canvas className="o-stockChart__header" ref={chartHeaderCanvasRef}></canvas>
		</div>
		<Box height={"360px"}>
			<canvas className="o-stockChart__kLine" ref={chartCanvas}></canvas>
			<canvas className="o-stockChart__movingAverage" ref={movingAerageCanvasRef}></canvas>
			<canvas className="o-stockChart__foreground" ref={foregroundCanvasRef}></canvas>
		</Box>
	</Box>; 
};

export const StockChart = React.memo(_StockChart);