export function findMaxIndexes(data: number[]): number[] {
	const max = Math.max(...data);
	const maxIndex = data.reduce((a, c, i) => {
		if(c === max) {
			return [...a, i];
		} else {
			return a;
		}
	},[]);

	return maxIndex;
}

export function findMinIndexes(data: number[]): number[]{
	const max = Math.min(...data);
	const maxIndex = data.reduce((a, c, i) => {
		if(c === max) {
			return [...a, i];
		} else {
			return a;
		}
	},[]);

	return maxIndex;
}

export function getMinPointCanvas(arg?: string) {
	const canvas = document.createElement("canvas");
	canvas.width = 120;
	canvas.height = 60;
	const ctx = canvas.getContext("2d");

	if (ctx) {
		const gradient = ctx.createLinearGradient(0, 0, 60, 60);
		gradient.addColorStop(0, "rgba(0, 0, 0, 0.65)");
		gradient.addColorStop(1, "rgba(0, 0, 255, 1)");
		ctx.fillStyle = gradient;
		ctx.arc(60, 30, 15, 0, 2*Math.PI);
		ctx.fill();
		ctx.beginPath();
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.font = "bold 20px sens-rif";
		ctx.fillStyle = "rgb(100, 100, 255)";
		ctx.fillText(`Min - ${arg ? arg: ""}`, 60, 30);
	}

	return canvas;
}

export function getMaxPointCanvas(arg?: string) {
	const canvas = document.createElement("canvas");
	canvas.width = 120;
	canvas.height = 60;
	const ctx = canvas.getContext("2d");

	if (ctx) {
		const gradient = ctx.createLinearGradient(0, 0, 60, 60);
		gradient.addColorStop(0, "rgba(10, 0, 0, 0.65)");
		gradient.addColorStop(1, "rgba(255, 0, 0, 1)");
		ctx.fillStyle = gradient;
		ctx.arc(60, 30, 15, 0, 2*Math.PI);
		ctx.fill();
		ctx.beginPath();
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.font = "bold 20px sens-rif";
		ctx.fillStyle = "rgb(255, 100, 100)";
		ctx.fillText(`Max - ${arg ? arg: ""}`, 60, 30);
	}

	return canvas;
}