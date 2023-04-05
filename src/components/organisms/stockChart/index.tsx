import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { weightedData } from "./const";
import { KLines } from "./lib/kLines";

function getElementSize(element: HTMLElement) {
	const width = element.offsetWidth;
	const height = element.offsetHeight;
	return { width, height };
}

const _StockChart = () => {
	const kLines = useRef<KLines|null>(null);
	const chartCanvas = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (chartCanvas.current && chartCanvas.current.getContext("2d") && chartCanvas.current.parentElement) {
			const wrapperSize = getElementSize(chartCanvas.current.parentElement);
			chartCanvas.current.width = wrapperSize.width;
			chartCanvas.current.height = wrapperSize.height;
			kLines.current = new KLines(chartCanvas.current, weightedData);
		} else {
			alert("不支援CanvasRenderingContext2D");
		}
		return () => {
			kLines.current = null;
		};
	}, []);

	return <Box>
		<canvas width={800} height={600} ref={chartCanvas}></canvas>
	</Box>; 
};

export const StockChart = React.memo(_StockChart);