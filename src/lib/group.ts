type GroupResult<T> = Record<string, T[]>

const groupByColumn = <T>(data: T[], column: keyof T): GroupResult<T> | undefined => {
	try {
		if (data.length === 0 ) {
			return {};
		} else if(typeof data[0][column] !== "string" && typeof data[0][column] !== "number"){
			throw new Error("用以分類的欄位內容型態不正確");
		} else {
			const result: GroupResult<T> = data.reduce((ac: GroupResult<T>, cu) => {
				const currentGroupType = cu[column] as string | number;
				if (ac[currentGroupType]) {
					return {
						...ac,
						[currentGroupType]: [
							...ac[currentGroupType],
							cu
						]
					};
				} else {
					return {
						...ac,
						[currentGroupType]: [
							cu
						]
					};
				}
			}, {});
			return result;
		}
	} catch (error) {
		console.log(error);
		alert("用以分類的欄位內容型態不正確: 非string與number。");
	}
};

export { groupByColumn };