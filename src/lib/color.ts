function getRandomColors(length: number) {
	const randomColors = [];
	for (let index = 0; index < length; index++) {
		const randomColor = getRandomColor();
		randomColors.push(randomColor);		
	}
	return randomColors;
}

function getRandomColor() {
	const letters = "0123456789ABCDEF".split("");
	let color = "#";
	for (let i = 0; i < 6; i++ ) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}

export { getRandomColors, getRandomColor };