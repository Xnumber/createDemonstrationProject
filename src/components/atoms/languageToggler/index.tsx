import { ButtonBase, Typography } from "@mui/material";
import { hideLoading, showLoading } from "features/loading/loadingSlice";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "src/app/hooks";
function _LanguageToggler(){
	const { i18n } = useTranslation();
	const dispatch = useAppDispatch();
	const { lng } = useParams();
	const toggleLanguage = useCallback(() => {
		dispatch(showLoading({ event: "toggleLanguage", message: ""}));
		setTimeout(() => {
			const newLang = i18n.language === "zh" ? "en": "zh";
			localStorage.setItem("front-end-development-language", newLang);
			setTimeout(() => {
				i18n.changeLanguage(newLang);
				dispatch(hideLoading({ event: "toggleLanguage", message: ""}));
			},300);
		}, 300);
	}, [i18n.language]);

	return <Link to={`/${lng === "en" ? "zh": "en"}${location.pathname.replace(new RegExp("/en|/zh"), "")}`} onClick={toggleLanguage}>
		<ButtonBase disableRipple >
			<Typography variant="button" fontWeight={300} component={"span"} color={"var(--md-sys-color-on-background)"}>
				English / 中文
			</Typography>
		</ButtonBase>
	</Link>;
}

export const LanguageToggler = React.memo(_LanguageToggler);