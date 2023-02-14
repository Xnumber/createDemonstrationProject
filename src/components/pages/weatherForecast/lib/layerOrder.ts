import { WeatherDataset } from "../typing";

export function getTopLayerSpecifiedDataset(dataset: WeatherDataset, topLayerDatasetIndex: number) {
	const orderedDatasets = dataset.map((d, i) => ({...d, order: i + 1}));
	if (dataset.length > 0 && topLayerDatasetIndex !== -1) {
		const topLayerSpecifiedDatasets = orderedDatasets.reduce((a, c, i) => {
			if (i === topLayerDatasetIndex) {
				return [
					...a,
					{
						...c,
						order: 1
					}
				];
			} else if(i < topLayerDatasetIndex) {
				return [
					...a,
					{
						...c,
						order: i + 2
					}
				];
			} else {
				return [
					...a,
					{
						...c,
						order: i + 1
					}
				];
			}
		}, []);

		topLayerSpecifiedDatasets.forEach(o => { console.log(o.label);});
		return topLayerSpecifiedDatasets;
	} else {
		return orderedDatasets;
	}
}