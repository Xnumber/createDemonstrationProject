import React, { useEffect, useRef } from "react";
import { Liquify } from "./lib";
import { LiquidProps } from "./type";
import { Box, Typography } from "@mui/material";
import { XCenter } from "templates/xCenter";

export function Liquid(props: LiquidProps) {
	const { width , height, name, time, percent } = props;
	const w = width ? width: 200;
	const h = height ? height: 200;
	const canvasRef = useRef(null);
	const liquidRef = useRef<Liquify|null>();
	
	useEffect(() => {
		
		if (canvasRef.current) {
			liquidRef.current = new Liquify(
				canvasRef.current,
				h, 
				w,
				percent
			);
		}
		return () => {
			liquidRef.current?.stopAnimte();
			liquidRef.current = null;
		};
	});
	
	return <Box width={w+2}>
		<canvas ref={canvasRef}></canvas>
		<XCenter>
			<Typography textAlign={"center"} variant="h3">
				{name}
			</Typography>
		</XCenter>
		<XCenter>
			<Typography  variant="h5">
				{time}
			</Typography>
		</XCenter>
	</Box>;
}