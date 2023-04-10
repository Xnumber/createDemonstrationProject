import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { weightedData } from "./const";
import { KLines } from "./lib/kLines";
// import { KLines as KLines2 } from "./lib/charts/kLines";
import { Line as Line2 } from "./lib/charts";
import "./style.scss";
import { CrossHair } from "./lib/crossHair";
import { StockChartHeader } from "./lib/header";
import { useAppSelector } from "src/app/hooks";
import { MovingAerage } from "./lib/movingAverage";
import { Line } from "./lib/line";
import { Chart } from "./lib/chart";
// import { BasicChart } from "./lib/basicChart";
// import { StockChartType } from "./lib/type";

function getElementSize(element: HTMLElement) {
	const width = element.offsetWidth;
	const height = element.offsetHeight;
	return { width, height };
}

const _StockChart = () => {

	const chartRef = useRef<Chart|null>(null);
	const chartContainerRef = useRef<HTMLDivElement>(null);
	const kLines = useRef<KLines|null>(null);
	const crossHair = useRef<CrossHair|null>(null);
	const stockChartHeader = useRef<StockChartHeader|null>(null);
	const line = useRef<Line|null>(null);
	const movingAerage = useRef<MovingAerage|null>(null);
	const chartCanvas = useRef<HTMLCanvasElement>(null);
	const foregroundCanvasRef = useRef<HTMLCanvasElement>(null);
	const chartHeaderCanvasRef = useRef<HTMLCanvasElement>(null);
	const movingAerageCanvasRef = useRef<HTMLCanvasElement>(null);
	const lineCanvaseRef = useRef<HTMLCanvasElement>(null);
	const mode = useAppSelector(state => state.theme.mode);
	// const stockChartType = useState<StockChartType>("k-line");

	useEffect(() => {
		if (
			lineCanvaseRef.current &&
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
			lineCanvaseRef.current.width = wrapperSize.width;
			lineCanvaseRef.current.height = wrapperSize.height;
			kLines.current = new KLines(chartCanvas.current, weightedData, mode);
			// line.current = new Line(lineCanvaseRef.current, weightedData, foregroundCanvasRef.current, mode);
			crossHair.current = new CrossHair(foregroundCanvasRef.current, chartCanvas.current, mode);
			stockChartHeader.current = new StockChartHeader(chartHeaderCanvasRef.current, kLines.current, foregroundCanvasRef.current, mode);
			// movingAerage.current = new MovingAerage(movingAerageCanvasRef.current, kLines.current, foregroundCanvasRef.current, mode);
		} else {
			alert("不支援CanvasRenderingContext2D");
		}

		return () => {
			kLines.current?.destroy();
			crossHair.current?.destroy();
			stockChartHeader.current?.destroy();
			movingAerage.current?.destroy();
			line.current?.destroy();
		};
	}, []);

	useEffect(() => {
		crossHair.current?.setMode(mode);
		stockChartHeader.current?.setMode(mode);
		kLines.current?.setMode(mode);
	}, [mode]);

	useEffect(() => {
		if (chartContainerRef.current) {
			chartRef.current = new Chart(
				chartContainerRef.current,
				weightedData,
				[Line2],
				mode
			);
		}
	}, []);

	return <Box>
		<div>
			<canvas className="o-stockChart__header" ref={chartHeaderCanvasRef}></canvas>
		</div>
		<Box height={"360px"}>
			<canvas className="o-stockChart__kLine" ref={chartCanvas}></canvas>
			<canvas className="o-stockChart__movingAverage" ref={movingAerageCanvasRef}></canvas>
			<canvas className="o-stockChart__line" ref={lineCanvaseRef}></canvas>
			<canvas className="o-stockChart__foreground" ref={foregroundCanvasRef}></canvas>
		</Box>
		<Box position={"relative"} height={"360px"} ref={chartContainerRef}>

		</Box>
	</Box>; 
};

export const StockChart = React.memo(_StockChart);