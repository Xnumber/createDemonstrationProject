import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const weatherApi = createApi({
	reducerPath: "weatherApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://opendata.cwb.gov.tw/api/v1/rest/datastore" }),
	tagTypes: ["GetWeather"],
	endpoints: () => ({}),
});