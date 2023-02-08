const sortByAsc = (a: number, b: number) => {
	if (a > b) {
		return 1;
	} else if(a < b) {
		return -1;
	}
	return 0;
};

const sortByDesc = (a: number, b: number) => {
	if (a < b) {
		return 1;
	} else if(a > b) {
		return -1;
	}
	return 0;
};

const sortArrayByColumn = <T>(data: T[], column: keyof T, order: "asc" | "desc"): T[] => {
	let result = [...data];
	result = order === "asc" ? result.sort((a: T, b: T) => {
		return sortByAsc(a[column] as number, b[column] as number);
	}): result.sort((a: T, b: T) => {
		return sortByDesc(a[column] as number, b[column] as number);
	});
	return result;
};

export { sortArrayByColumn }; 