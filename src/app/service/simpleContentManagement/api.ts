import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const simpleContentManagementApi = createApi({
	reducerPath: "simpleContentManagementApi",
	baseQuery: fetchBaseQuery({ 
		baseUrl: SIMPLE_CONTENT_MANAGEMENT_API_BASE_URL,
		credentials: "include",
		prepareHeaders: (headers) => {
			const xsrfToken =  Cookies.get("XSRF-TOKEN");
			if (xsrfToken) {
				headers.set("X-XSRF-TOKEN", xsrfToken);
			}
		},
	}),
	tagTypes: ["GetSimpleContent", "DeleteSimpleContent", "UpdateSimpleContent"],
	endpoints: () => ({}),
});