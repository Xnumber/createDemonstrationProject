import { ButtonBase, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { disableLoading, loading } from "src/lib/loading";

function _LanguageToggler(){
	const { i18n } = useTranslation();
	const { lng } = useParams();
	
	const toggleLanguage = useCallback(() => {
		loading("ToggleLanguage");
		const newLang = i18n.language === "zh" ? "en": "zh";
		localStorage.setItem("front-end-development-language", newLang);
		i18n.changeLanguage(newLang);
		disableLoading("ToggleLanguage");
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