import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { disableLoading, loading } from "src/lib/loading";
import Cookies from "js-cookie";

export const authApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost",
		prepareHeaders: (headers) => {
			const xsrfToken =  Cookies.get("XSRF-TOKEN");
			headers.set("Content-Type", "application/json");
			if (xsrfToken) {
				headers.set("X-XSRF-TOKEN", xsrfToken);
			}
			return headers;
		},
		credentials: "include"
	}),
	endpoints: (builder) => ({
		getXCSRFToken: builder.query<void, void>({
			query: () => "/sanctum/csrf-cookie",
			onQueryStarted: async (
				_arg,
				{
					queryFulfilled,
				}) => {
				loading("GetXCSRFToken", "method: GET");
				await queryFulfilled;
				disableLoading("GetXCSRFToken");
			},
		})
	}),
});

export const { 
	useLazyGetXCSRFTokenQuery,
	useGetXCSRFTokenQuery 
} = authApi;