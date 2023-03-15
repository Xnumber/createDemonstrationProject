import { disableLoading, loading } from "src/lib/loading";
import { simpleContentManagementApi } from "./api";
const api = simpleContentManagementApi.injectEndpoints({
	endpoints: (build) => ({
		// builder.mutation<UserResponse, LoginRequest>({
		uploadSimpleContent: build.mutation<{ status: boolean }, { [k: string]: string | number }[]>({
			query: (data) => ({
				url: "/contents/upload",
				method: "POST",
				body: JSON.stringify(data),
			}),
			invalidatesTags: ["GetSimpleContent"],
			onQueryStarted: async (
				_arg,
				{
					queryFulfilled,
				}) => {
				loading("UploadSimpleContent",	"method: POST");
				const result = await queryFulfilled;
				if(result.data.status) {
					alert("success");
					disableLoading("UploadSimpleContent",	"");
				} else {
					alert("error");
					disableLoading("UploadSimpleContent",	"");
				}	
			},
		}),
	})
});

export const { useUploadSimpleContentMutation } = api;