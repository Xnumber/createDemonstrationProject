import React, { useEffect, useRef, useState, useCallback } from "react";
import { Box } from "@mui/material";
import { stockGraphLibNames, weightedData } from "./const";
import { KLines } from "./lib/kLines";
import "./style.scss";
import { CrossHair } from "./lib/crossHair";
import { StockChartHeader } from "./lib/header";
import { useAppSelector } from "src/app/hooks";
import { MovingAerage } from "./lib/movingAverage";
import { Line } from "./lib/line";
import { Chart } from "./lib/chart";
import { StockGraphLibName } from "./lib/type";
import { MultipleSelect } from "molecules/multipleSelect";

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
	const [chosenGraphLibNames, setChosenGraphLibNames] = useState<StockGraphLibName[]>(["KLines"]);
	// const stockChartType = useState<StockChartType>("k-line");
	const initialRender = useRef(true);
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

	const handleChosenGraphLibNames = useCallback((e: string[]|string) => {
		if(typeof e === "string") {
			setChosenGraphLibNames([e as StockGraphLibName]);
		} else {
			setChosenGraphLibNames(e as StockGraphLibName[]);
		}
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
				mode,
				chosenGraphLibNames
			);
		}
	}, []);
	
	useEffect(() => {
		if(chartRef.current && !initialRender.current) {
			chartRef.current.updateGraphLib(chosenGraphLibNames);
		}
	}, [chosenGraphLibNames]);

	useEffect(() => {
		initialRender.current = false;
	}, []);

	return <Box>
		<MultipleSelect
			defaultSelected={chosenGraphLibNames}
			options={stockGraphLibNames.map(sgl => ({ value: sgl, label: sgl}))}
			callback={handleChosenGraphLibNames}
		/>
		<Box position={"relative"} height={"360px"} ref={chartContainerRef}>

		</Box>
		<div>
			<canvas className="o-stockChart__header" ref={chartHeaderCanvasRef}></canvas>
		</div>
		<Box height={"360px"}>
			<canvas className="o-stockChart__kLine" ref={chartCanvas}></canvas>
			<canvas className="o-stockChart__movingAverage" ref={movingAerageCanvasRef}></canvas>
			<canvas className="o-stockChart__line" ref={lineCanvaseRef}></canvas>
			<canvas className="o-stockChart__foreground" ref={foregroundCanvasRef}></canvas>
		</Box>
	</Box>;
};

export const StockChart = React.memo(_StockChart);