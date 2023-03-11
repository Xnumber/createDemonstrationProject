import { disableLoading, loading } from "src/lib/loading";
import { authApi } from "./api";
import { deleteCredentials } from "features/auth/authSlice";
// import { ContentRawData } from "./type";
// import { ReservoirEveryDayDataResponse, ReservoirEveryHourServiceResponse } from "./type";
// https://data.wra.gov.tw/openapi/swagger/index.html
export interface RegisterRequest {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

const api = authApi.injectEndpoints({
	endpoints: (build) => ({
		// builder.mutation<UserResponse, LoginRequest>({
		logout: build.mutation<{ status: boolean }, void>({
			query: () => ({
				url: "/logout",
				method: "POST",
			}),
			onQueryStarted: async (
				_arg,
				{
					queryFulfilled,
					dispatch
				}) => {
				loading("Logout",	"method: POST");
				await queryFulfilled;
				dispatch(deleteCredentials());

				disableLoading("Logout",	"");

			},
		}),
	})
});

export const { useLogoutMutation } = api;