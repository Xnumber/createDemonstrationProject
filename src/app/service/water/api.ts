import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const waterApi = createApi({
	reducerPath: "waterApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://data.wra.gov.tw/OpenAPI/api/OpenData" }),
	tagTypes: ["GetReservoirEveryDayService", "GetReservoirData"],
	endpoints: () => ({}),
});