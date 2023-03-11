import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
// import { RootState } from "store"
export const simpleContentManagementApi = createApi({
	reducerPath: "simpleContentManagementApi",
	baseQuery: fetchBaseQuery({ 
		baseUrl: "http://localhost/api",
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