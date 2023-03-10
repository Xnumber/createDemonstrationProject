import { disableLoading, loading } from "src/lib/loading";
import { simpleContentManagementApi } from "./api";
import { setUpdateModalShown } from "features/simpleContentManagement/listActions/listActionSlice";

const api = simpleContentManagementApi.injectEndpoints({
	endpoints: (build) => ({
		updateSimpleContent: build.mutation<{ status: boolean }, FormData>({
			query: (data) => {
				data.append("_method", "PUT");
				return {
					url: `/contents/${data.get("id")}`,
					method: "POST",
					body: data,
				};},
			invalidatesTags: ["GetSimpleContent"],
			onQueryStarted: async (
				_arg,
				{
					queryFulfilled,
					dispatch
				}) => {
				loading("UpdateSimpleContent",	"method: POST(coloumn _method: PUT)");
				await queryFulfilled;
				dispatch(setUpdateModalShown(false));
				disableLoading("UpdateSimpleContent");
			},
		}),
	})
});

export const { useUpdateSimpleContentMutation } = api;