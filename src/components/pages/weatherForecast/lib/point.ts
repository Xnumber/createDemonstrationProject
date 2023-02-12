// export function getWeatherTagPointStyles (data: WeatherData, weatherTags: WeatherTag[]): WeatherTagPointStyle{
// 	const maxIndexes = data.datasets.map(o => {
// 		const values = o.data.map(value => Number(value.y));
// 		return {
// 			label: o.label,
// 			maxIndexes: findMaxIndexes(values)
// 		};
// 	});

// 	const minIndexes = data.datasets.map(o => {
// 		const values = o.data.map(value => Number(value.y));
// 		return {
// 			label: o.label,
// 			minIndexes: findMinIndexes(values)
// 		};
// 	});
	
// 	return {
// 		max: {
// 			pointStyle: weatherTags.includes("min") ? getCreateMinMaxPointStyleFunction(minIndexes, maxIndexes): getCreateMaxPointStyleFunction(maxIndexes),
// 			radius: 10,
// 			hoverRadius: 30
// 		},
// 		min:{
// 			pointStyle: weatherTags.includes("max") ? getCreateMinMaxPointStyleFunction(minIndexes, maxIndexes): getCreateMinPointStyleFunction(minIndexes),
// 			radius: 10,
// 			hoverRadius: 30
// 		},
// 	};
// }

// function findMaxIndexes(data: number[]): number[] {
// 	const max = Math.max(...data);
// 	// const maxIndex = data.filter(value => value === max);
// 	const maxIndex = data.reduce((a, c, i) => {
// 		if(c === max) {
// 			return [...a, i];
// 		} else {
// 			return a;
// 		}
// 	},[]);

// 	return maxIndex;
// }

// function findMinIndexes(data: number[]): number[]{
// 	const max = Math.min(...data);
// 	// const maxIndex = data.filter(value => value === max);
// 	const maxIndex = data.reduce((a, c, i) => {
// 		if(c === max) {
// 			return [...a, i];
// 		} else {
// 			return a;
// 		}
// 	},[]);

// 	return maxIndex;
// }

// // funtction getCreateMinMaxPointStyleFunction(minIndexes: { label: string | undefined; minIndexes: number[]; }[], maxIndexes: { label: string | undefined; maxIndexes: number[]; }[]) => ScriptableAndArray<PointStyle, ScriptableContext<"line">> | undefined = (minIndexes, maxIndexes){
// // 	return (ctx, options:{ radius: number; hoverRadius: number }) => {
// // 		const thisMaxIndexes = maxIndexes.find(o => o.label === ctx.dataset.label);
// // 		const thisMinIndexes = minIndexes.find(o => o.label === ctx.dataset.label);
		
// // 		const canvas = getInitailizedPointCanvase({ width: 120, height: 60});
// // 		const pointCenter = { x: 60, y: 30 };
// // 		const minTextProps = { x: 10, y: 30, text: `${ctx.dataset.label} - 最小值`};
// // 		const maxTextProps = { x: 10, y: 30, text: `${ctx.dataset.label} - 最大值`};
		
// // 		if (thisMaxIndexes && thisMaxIndexes.maxIndexes.indexOf(ctx.dataIndex) !== -1) {
// // 			const canvasCtx = canvas.getContext("2d") as CanvasRenderingContext2D;
// // 			const activeElements = ctx.chart.getActiveElements();
// // 			const currentIndex = ctx.dataIndex;
// // 			if (activeElements.find(aE => aE.index === currentIndex)) {
// // 				drawPoint(canvasCtx, { ...pointCenter, radius: options.radius });
// // 				drawText(canvasCtx, maxTextProps);
// // 				const interval = setInterval(() => {
// // 					if (options.radius < options.hoverRadius) {
// // 						options.radius+=1;
// // 						drawPoint(canvasCtx, { ...pointCenter, radius: options.radius });
// // 						drawText(canvasCtx, maxTextProps);
// // 					} else {
// // 						clearInterval(interval);
// // 					}
// // 				}, 10);
// // 			} else {
// // 				drawPoint(canvasCtx, { ...pointCenter, radius: options.radius });
// // 				drawText(canvasCtx, maxTextProps);
// // 				const interval = setInterval(() => {
// // 					if (options.radius > 5) {
// // 						options.radius-=1;
// // 						drawPoint(canvasCtx, { ...pointCenter, radius: options.radius });
// // 						drawText(canvasCtx, maxTextProps);
// // 					} else {
// // 						clearInterval(interval);
// // 					}
// // 				}, 10);
// // 			}
// // 		}
		
// // 		if (thisMinIndexes && thisMinIndexes.minIndexes.indexOf(ctx.dataIndex) !== -1) {
// // 			const canvasCtx = canvas.getContext("2d") as CanvasRenderingContext2D;
// // 			const activeElements = ctx.chart.getActiveElements();
// // 			const currentIndex = ctx.dataIndex;
// // 			if (activeElements.find(aE => aE.index === currentIndex)) {
// // 				drawPoint(canvasCtx, { ...pointCenter, radius: options.radius });
// // 				drawText(canvasCtx, minTextProps);
// // 				const interval = setInterval(() => {
// // 					if (options.radius < options.hoverRadius) {
// // 						options.radius+=1;
// // 						drawPoint(canvasCtx, { ...pointCenter, radius: options.radius });
// // 						drawText(canvasCtx, minTextProps);
// // 					} else {
// // 						clearInterval(interval);
// // 					}
// // 				}, 10);
// // 			} else {
// // 				drawPoint(canvasCtx, { ...pointCenter, radius: options.radius });
// // 				drawText(canvasCtx, minTextProps);
// // 				const interval = setInterval(() => {
// // 					if (options.radius > 5) {
// // 						options.radius-=1;
// // 						drawPoint(canvasCtx, { ...pointCenter, radius: options.radius });
// // 						drawText(canvasCtx, minTextProps);
// // 					} else {
// // 						clearInterval(interval);
// // 					}
// // 				}, 10);
// // 			}
// // 		}
// // 		return canvas;
// // 	};
// // };