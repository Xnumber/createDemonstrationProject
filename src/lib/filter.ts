type FilterConditions = {
	type: ">";
	condition: number;
} | {
	type: "<";
	condition: number;
} | {
	type: "><";
	condition: [number, number];
} | {
	type: "<>";
	condition: [number, number]
} | {
	type: "===";
	condition: number | string
}
const filterByCondition = <T>(
	data: T[],
	column: keyof T,
	filterCondition: FilterConditions
): T[] => {
	const { type, condition } = filterCondition;
	if (type === ">") {
		const result = data.filter(o => {
			return o[column] > condition;
		});
		return result;
	} else if(type === "<"){
		const result = data.filter(o => {
			return o[column] < condition;
		});
		return result;
	} else if(type === "><") {
		const result = data.filter(o => {
			return o[column] > condition[0] && o[column] < condition[1];
		});
		return result;
	} else if(type === "<>") {
		const result = data.filter(o => {
			return o[column] > condition[1] || o[column] < condition[0];
		});
		return result;
	} else if(type === "===") {
		const result = data.filter(o => {
			return o[column] === condition;
		});
		return result;
	}
	return [];
};

export { filterByCondition };