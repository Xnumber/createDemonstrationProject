import { disableLoading, loading } from "src/lib/loading";
import { authApi } from "./api";
import { setCredentials } from "features/auth/authSlice";
import { LoginRequest, UserResponse } from "./type";

export interface RegisterRequest {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

const api = authApi.injectEndpoints({
	endpoints: (builder) => ({
		checkLogin: builder.mutation<UserResponse, void>({
			query: () => ({
				url: "/checkLogin",
				method: "POST",
			}),
			onQueryStarted: async (
				_arg,
				{
					queryFulfilled,
					dispatch,
				}) => {
				loading("CheckLogin", "");
				const result = await queryFulfilled;
				if(!result.data.errors) {
					const name = result.data.user.name;
					const email = result.data.user.email;
					dispatch(setCredentials(
						{ user: { 
							name: name,
							email: email 
						}}
					));
					disableLoading("CheckLogin",	"");
				} else {
					disableLoading("CheckLogin",	"");
				}
			},
		}),
		login: builder.mutation<UserResponse, LoginRequest>({
			query: (credentials) => ({
				url: "/login",
				method: "POST",
				body: JSON.stringify(credentials),
			}),
			onQueryStarted: async (
				arg,
				{
					queryFulfilled,
					dispatch,
				}) => {
				loading("Login", `method: POST, email: ${arg.email}, password: ${arg.password}`);
				const result = await queryFulfilled;
				if(!result.data.errors) {
					const name = result.data.user.name;
					const email = result.data.user.email;
					dispatch(setCredentials(
						{ user: { 
							name: name,
							email: email
						}}
					));
					disableLoading("Login",	"");
				} else {
					disableLoading("Login",	"");
				}
			},
		}),
	})
});

export const { useLoginMutation, useCheckLoginMutation } = api;