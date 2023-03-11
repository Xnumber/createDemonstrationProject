import { disableLoading, loading } from "src/lib/loading";
import { simpleContentManagementApi } from "./api";
const api = simpleContentManagementApi.injectEndpoints({
	endpoints: (build) => ({
		CreateSimpleContent: build.mutation<{ status: boolean }, FormData>({
			query: (data) => ({
				url: "/contents",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["GetSimpleContent"],
			onQueryStarted: async (
				arg,
				{
					queryFulfilled,
				}) => {
				const name = arg.get("name")?.toString();
				loading("CreateSimpleContent", `method: POST, name: ${name ? name: ""}`);
				await queryFulfilled;
				disableLoading("CreateSimpleContent",	"");
			},
		}),
	})
});

export const { useCreateSimpleContentMutation } = api;