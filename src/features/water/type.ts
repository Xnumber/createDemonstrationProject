import { ReservoirEveryHourServiceResponse } from "service/water/type";
export type ProcessedReservoirEveryHourServiceResponseData =
(ReservoirEveryHourServiceResponse["responseData"][number] & {
	ObservationTime: string,
	ReservoirName: string,
	EffectiveCapacity: string,
	ratio: number
})[]