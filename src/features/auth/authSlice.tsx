import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { User } from "service/auth/type";

type AuthState = {
	user: User | null
	token: string | null
}

export const authSlice = createSlice({
	name: "auth",
	initialState: { user: null, token: null } as AuthState,
	reducers: {
		setCredentials: (
			state,
			{ payload: { user } }: PayloadAction<{ user: User }>
		) => {
			state.user = user;
		},
		deleteCredentials: (state) => {
			state.user = null;
		}
	},
});

export const { setCredentials, deleteCredentials } = authSlice.actions;

// export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
