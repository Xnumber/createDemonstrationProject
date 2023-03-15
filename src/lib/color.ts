function getRandomColors(length: number) {
	const randomColors = [];
	for (let index = 0; index < length; index++) {
		const randomColor = getRandomColor();
		randomColors.push(randomColor);		
	}
	return randomColors;
}

function getRandomColor(){ return "#" + Math.floor(Math.random()*16777215).toString(16);}

export { getRandomColors, getRandomColor };