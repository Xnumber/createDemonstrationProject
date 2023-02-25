import { disableLoading, loading } from "src/lib/loading";
import { waterApi } from "./api";
import { ReservoirEveryDayDataResponse, ReservoirEveryHourServiceResponse } from "./type";
// https://data.wra.gov.tw/openapi/swagger/index.html

const api = waterApi.injectEndpoints({
	endpoints: (build) => ({
		getReservoirEveryHourService: build.query<ReservoirEveryHourServiceResponse, void>({
			query: () => "1602CA19-B224-4CC3-AA31-11B1B124530F/Data",
			providesTags: ["GetReservoirEveryDayService"],
			onQueryStarted: async (
				_arg,
				{
					queryFulfilled,
				}) => {
				loading("GetReservoirEveryDayService",	"");
				await queryFulfilled;
				disableLoading("GetReservoirEveryDayService",	"");
			},
		}),
		getReservoirData: build.query<ReservoirEveryDayDataResponse, void>({
			query: () => "50C8256D-30C5-4B8D-9B84-2E14D5C6DF71/Data",
			providesTags: ["GetReservoirData"],
			onQueryStarted: async (_arg, { queryFulfilled }) => {
				loading("GetReservoirData",	"");
				await queryFulfilled;
				disableLoading("GetReservoirData",	"");
			},
		}),
	})
});

export const {  useGetReservoirDataQuery,  useGetReservoirEveryHourServiceQuery } = api;