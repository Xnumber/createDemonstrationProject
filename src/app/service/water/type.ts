export type ReservoirEveryHourServiceResponse = {
	totalPage: number;
	totalDataSize: number;
	page: number;
	size: number;
	responseData: {
		"AccumulateRainfallInCatchment": string;
		"DesiltingTunnelOutflow": string;
		"DrainageTunnelOutflow": string;
		"EffectiveWaterStorageCapacity": string;
		"InflowDischarge": string;
		"ObservationTime": string;
		"OthersOutflow": string;
		"PowerOutletOutflow": string;
		"PredeterminedCrossFlow": string;
		"PredeterminedOutflowTime": string;
		"ReservoirIdentifier": string;
		"SpillwayOutflow": string;
		"StatusType": string;
		"TotalOutflow": string;
		"WaterDraw": string;
		"WaterLevel": string;
	}[]
}

export type ReservoirEveryDayDataResponse = {
	"totalPage": number,
	"totalDataSize": number,
	"page": number,
	"size":  number,
	"responseData": {
		"CatchmentAreaRainfall": string,
		"CrossFlow": string,
		"DeadStorageLevel": string,
		"EffectiveCapacity": string,
		"FullWaterLevel": string,
		"InflowVolume": string,
		"Outflow": string,
		"OutflowDischarge": string,
		"OutflowTotal": string,
		"RecordTime": string,
		"RegulatoryDischarge": string,
		"ReservoirIdentifier": string,
		"ReservoirName": string
	}[]
}