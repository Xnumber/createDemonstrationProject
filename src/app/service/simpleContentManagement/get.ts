import { disableLoading, loading } from "src/lib/loading";
import { simpleContentManagementApi } from "./api";
import { ContentRawData } from "./type";

const api = simpleContentManagementApi.injectEndpoints({
	endpoints: (build) => ({
		getSimpleContent: build.query<ContentRawData, { type: string; searchString: string}>({
			query: ({ type, searchString }) => `/contents?type=${type}&searchString=${searchString}`,
			providesTags: ["GetSimpleContent"],
			onQueryStarted: async (
				arg,
				{
					queryFulfilled,
				}) => {
				loading("GetSimpleContent",	`method: GET, type: ${arg.type}, searchString: ${arg.searchString}`);
				await queryFulfilled;
				disableLoading("GetSimpleContent");
			},
		}),
	})
});

export const { useGetSimpleContentQuery, useLazyGetSimpleContentQuery } = api;
export const { useQueryState: useGetSimpleContentQueryState } = api.endpoints.getSimpleContent;