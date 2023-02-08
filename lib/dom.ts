const getElementById = (id: string) => {
	const element = document.getElementById(id);
	if (element) {
		return element;
	} else {
		
		console.log(`Element with id - ${id} doesn't exist!`);
		return null;
	}
};

export { getElementById };