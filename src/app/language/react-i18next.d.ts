import translationEn from "./locales/en/translation.json";
import WeatherForecast from "./locales/en/weather-forecast.json";
import Water from "./locales/en/water.json";
import HomeEn from "./locales/en/home.json";
import SimpleContentManagementEn from "./locales/en/simple-content-management.json";
import AboutEn from "./locales/en/about.json";
declare module "react-i18next" {
	interface CustomTypeOptions {
		defaultNS: typeof translationEn;
		resources: {
			"home": typeof HomeEn;
			"translation": typeof translationEn;
			"weather-forecast": typeof WeatherForecast;
			"water": typeof Water;
			"simple-content-management": typeof SimpleContentManagementEn;
			"about": typeof AboutEn;
		}
	}
}

type Language = "en" | "zh";
export { Language };