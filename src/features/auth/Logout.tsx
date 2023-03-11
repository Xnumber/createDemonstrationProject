import React from "react";
import { Button } from "@mui/material";
import { useLogoutMutation } from "service/auth/logout";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/app/hooks";

export const Logout = () => {
	const [ logout ] = useLogoutMutation();
	const { t } = useTranslation("simple-content-management");
	const user = useAppSelector(state => state.auth.user);
	const handleLogout = () => {
		logout();
	};
	return <>
		{
			user ? 
				<Button onClick={handleLogout} variant="contained">
					{t("logout")}
				</Button>: null
		}
	</>;
};

export default Logout;