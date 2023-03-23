function getRandomColors(length: number) {
	const randomColors = [];
	for (let index = 0; index < length; index++) {
		const randomColor = getRandomColor();
		randomColors.push(randomColor);		
	}
	return randomColors;
}

function getRandomColor(){ return "#"+(Math.random()*0xFFFFFF<<0).toString(16);}

export { getRandomColors, getRandomColor };