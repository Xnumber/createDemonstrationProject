import { disableLoading, loading } from "src/lib/loading";
import { authApi } from "./api";
import { setCredentials } from "features/auth/authSlice";
import { UserResponse } from "./type";
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
		register: build.mutation<UserResponse, RegisterRequest>({
			query: (data) => ({
				url: "/register",
				method: "POST",
				body: JSON.stringify(data),
			}),
			onQueryStarted: async (
				arg,
				{
					queryFulfilled,
					dispatch
				}) => {
				loading("Register",	`method: POST, email: ${arg.email}, password: ${arg.password}`);
				const result = await queryFulfilled;
				const name = result.data.user.name;
				const email = result.data.user.email;
				dispatch(setCredentials(
					{ user: { 
						name: name,
						email: email 
					}}
				));
				disableLoading("Register");
			},
		}),
	})
});

export const { useRegisterMutation } = api;