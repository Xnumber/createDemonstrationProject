import { WeatherDataset, WeatherDerivative } from "../typing";

function addAverageDatasets(datasets: WeatherDataset): WeatherDataset {
	const averageDatasets = datasets.map((cDataset) => {
		const sum = cDataset.data.reduce((a, c) => a + Number(c.y), 0);
		const average = sum/cDataset.data.length;
		const dataset = {
			label: `${cDataset.label}: 平均`,
			data: cDataset.data.map((o) => {
				return {
					x: o.x,
					y: average
				};
			})
		};
		return dataset;
	});

	return [...datasets, ...averageDatasets];
}

function addMovingAverageDatasets(datasets: WeatherDataset): WeatherDataset {
	const averageDatasets = datasets.map((cDataset) => {
		const dataset = {
			label: `${cDataset.label}: 2個資料移動平均`,
			data: cDataset.data.map((o, i) => {
				const ma = i !== 0 ? ((Number(cDataset.data[i].y) + Number(cDataset.data[i - 1].y))/2): null;
				
				return {
					x: o.x,
					y: ma
				};
			})
		};
		return dataset;
	});

	return [...datasets, ...averageDatasets];
}

const addBiasDatasets =  (datasets: WeatherDataset, biasPairs: string[][]): WeatherDataset => {
	const biasDatasets: WeatherDataset = [];
	biasPairs.forEach(p => {
		const firstDataset = datasets.find(o => o.label === p[0]);
		const sectDataset = datasets.find(o => o.label === p[1]);
		if (firstDataset && sectDataset) {
			const biasData = firstDataset.data.map((o,i) => {
				return {
					x: o.x, y: (Number(o.y) - Number(sectDataset.data[i].y))
				};
			});

			biasDatasets.push({
				label: `${p[0]} - ${p[1]}`,
				data: biasData
			});
		}
	});
	
	return [...datasets, ...biasDatasets];
};

const derivedDatasetHandlers = {
	"average": addAverageDatasets,
	"bias": addBiasDatasets,
	"ma": addMovingAverageDatasets,
};

export function getDerivedData(data: WeatherDataset, derivatives: WeatherDerivative[], pairs: string[][]) {
	let resultData:  WeatherDataset = [
		...data
	];

	derivatives.forEach(o => {
		resultData = derivedDatasetHandlers[o](data, pairs);
	});
	
	return resultData;
}