import { WeatherDataset, WeatherDerivative } from "../typing";

export const getDerativeLabel = (label: string | undefined, derative: WeatherDerivative) => {
	if (derative === "moving-average") {
		return `${label}: 2個資料移動平均`;
	} else if(derative === "average"){
		return `${label}: 平均`;
	}
};

function addAverageDatasets(datasets: WeatherDataset): WeatherDataset {
	const averageDatasets = datasets.map((cDataset) => {
		const sum = cDataset.data.reduce((a, c) => a + Number(c.y), 0);
		const average = sum/cDataset.data.length;
		const dataset = {
			label: getDerativeLabel(cDataset.label, "average"),
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
			label: getDerativeLabel(cDataset.label , "moving-average"),
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

export const getDifferencesDatasetLabel = (pair: string[]) => {
	return `${pair[0]} - ${pair[1]}`;
};

const addDifferenceDatasets =  (datasets: WeatherDataset, biasPairs: string[][]): WeatherDataset => {
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
				label: getDifferencesDatasetLabel(p),
				data: biasData
			});
		}
	});
	
	return [...datasets, ...biasDatasets];
};

const derivedDatasetHandlers = {
	"average": addAverageDatasets,
	"difference": addDifferenceDatasets,
	"moving-average": addMovingAverageDatasets,
};

export function getDerivedDatasets(datasets: WeatherDataset, derivatives: WeatherDerivative[], pairs: string[][]) {
	let resultData:  WeatherDataset = [
		...datasets
	];
	
	derivatives.forEach(o => {
		if (derivedDatasetHandlers[o]) {
			resultData = derivedDatasetHandlers[o](datasets, pairs);
		}
	});
	
	return resultData;
}