import { disableLoading, loading } from "src/lib/loading";
import { simpleContentManagementApi } from "./api";
import { ContentRawData } from "./type";

const api = simpleContentManagementApi.injectEndpoints({
	endpoints: (build) => ({
		deleteSimpleContent: build.mutation<ContentRawData, { id: number }>({
			query: ({ id }) => ({
				url: `/contents/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["GetSimpleContent"],
			onQueryStarted: async (
				arg,
				{
					queryFulfilled,
				}) => {
				loading("DeleteSimpleContent",	`mothod: delete, id: ${arg.id}`);
				await queryFulfilled;
				disableLoading("DeleteSimpleContent",	"");	
			},
		}),
	})
});

export const { useDeleteSimpleContentMutation } = api;