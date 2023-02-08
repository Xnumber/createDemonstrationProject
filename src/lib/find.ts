const findMaxIndexes = (data: number[]): number[] => {
	const max = Math.max(...data);
	// const maxIndex = data.filter(value => value === max);
	const maxIndex = data.reduce((a, c, i) => {
		if(c === max) {
			return [...a, i];
		} else {
			return a;
		}
	},[]);

	return maxIndex;
};

const findMinIndexes = (data: number[]): number[] => {
	const max = Math.min(...data);
	// const maxIndex = data.filter(value => value === max);
	const maxIndex = data.reduce((a, c, i) => {
		if(c === max) {
			return [...a, i];
		} else {
			return a;
		}
	},[]);

	return maxIndex;
};

const getNextStringElement = <T>(arr: T[], current: string): T => {
	const currentIndex = arr.findIndex(o => o === current);

	return currentIndex === arr.length - 1 ? arr[0]: arr[currentIndex + 1];
};

export { findMaxIndexes, findMinIndexes, getNextStringElement };