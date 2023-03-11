import { ContentRawData } from "service/simpleContentManagement/type";
import { TypePercentageData } from "./typePercentageTable/type";
export function getTypePercentageTableData(rawData: ContentRawData["data"]): TypePercentageData[] {
	let allCost = 0;
	let allQuantity = 0;

	const allTypesWithQuantitiesAndCost: {
		type: string;
		totalCost: number;
		totalQuantity: number;
	}[] = [];

	rawData.forEach(rD => {
		allCost += rD.price*rD.quantity;
		allQuantity += rD.quantity;
		const typesWithQuantitiesAndCost = allTypesWithQuantitiesAndCost.find(o => rD.type === o.type);
		if (typesWithQuantitiesAndCost) {
			typesWithQuantitiesAndCost.totalCost += rD.price*rD.quantity;
			typesWithQuantitiesAndCost.totalQuantity += rD.quantity;
		} else {
			allTypesWithQuantitiesAndCost.push({
				type: rD.type,
				totalCost: rD.price,
				totalQuantity: rD.quantity
			});
		}
	});

	return allTypesWithQuantitiesAndCost.map(o => {
		return {
			type: o.type,
			quantityPercentage: Math.round((o.totalQuantity/allQuantity)*100)/100,
			costPercentage: Math.round((o.totalCost/allCost)*100)/100
		};
	});
}