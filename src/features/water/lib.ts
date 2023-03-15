import { WaterState } from "features/water/waterSlice";
import { orderBy } from "lodash";
import { ReservoirEveryDayDataResponse, ReservoirEveryHourServiceResponse } from "service/water/type";
import { areasWithReservoir } from "./const";
import { ProcessedReservoirEveryHourServiceResponseData } from "./type";
import { ChartData } from "chart.js";

export function waterResponseDataProcess(
	reservoirEveryDayServiceResponse: ReservoirEveryHourServiceResponse,
	reservoirEveryDayDataResponse :ReservoirEveryDayDataResponse,
	condition: WaterState["condition"]
) {
	const reservoirEveryHourServiceData = reservoirEveryDayServiceResponse.responseData;
	const reservoirData = reservoirEveryDayDataResponse.responseData;

	const reservoirEveryHourServiceLastData = reservoirEveryHourServiceData.reduce((a, c, i, arr) => {
		if (arr[i].ReservoirIdentifier !== arr[i + 1]?.ReservoirIdentifier ) {
			return [...a, c];
		} else {
			return a;
		}
	}, []);
	
	const processedData = reservoirEveryHourServiceLastData.reduce((a, rEH) => {
		const sameReservoirIdentifierData = reservoirData.find(rD => rD.ReservoirIdentifier === rEH.ReservoirIdentifier);
		if (sameReservoirIdentifierData?.EffectiveCapacity) {
			const ratio = Number(rEH.EffectiveWaterStorageCapacity)/Number(sameReservoirIdentifierData?.EffectiveCapacity);
			const time = rEH.ObservationTime.replace(/...../, "").replace("T", " ").replace("-", "/");
			return [
				...a,
				{
					...rEH,
					ObservationTime: time,
					ReservoirName: sameReservoirIdentifierData?.ReservoirName,
					EffectiveCapacity: sameReservoirIdentifierData?.EffectiveCapacity,
					ratio: Math.round(ratio*1000)/1000
				}
			];
		} else {
			return a;
		}
	}, []);
	const orderdData =  condition.sortChosen[0] !== "none" ? orderBy(processedData, "ratio", condition.sortChosen[0]): processedData;
	const areaFilteredData = condition.areaChosen[0] !== "none" ? Areafilter(orderdData, condition): orderdData;
	
	const reservoirFilteredData = condition.reservoirChosen.length > 0 ? reservoirFilter(areaFilteredData, condition): areaFilteredData;
	return reservoirFilteredData;
}

export function getChartData(resData: ReturnType<typeof waterResponseDataProcess>): ChartData<"line"> {
	const data = resData.map(o => {
		return o.ratio*100;
	});

	const chartLabels = resData.map(o => o.ReservoirName);

	return {
		labels: chartLabels,
		datasets: [{
			fill: true,
			backgroundColor: "blue",
			pointBackgroundColor: "aqua",
			pointRadius: 6,
			data: data
		}]
	};
}

function Areafilter(
	data: ProcessedReservoirEveryHourServiceResponseData, 
	condition: WaterState["condition"]
) {
	const { areaChosen } = condition;
	const area = areaChosen[0];
	const allReservoir = areasWithReservoir.reduce((aAR, cAR) => {
		if (cAR.areas.includes(area)) {
			return [...aAR, cAR.reservoir];
		} else {
			return aAR;
		}
	}, []);

	const filteredData = data.filter(d => allReservoir.includes(d.ReservoirName));
	return filteredData;
}

function reservoirFilter(
	data: ProcessedReservoirEveryHourServiceResponseData, 
	condition: WaterState["condition"])
{
	const { reservoirChosen } = condition;
	const filteredData = data.filter(d => {
		return reservoirChosen.includes(d.ReservoirName);
	});

	return filteredData;
}