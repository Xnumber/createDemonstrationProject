import translationEn from "./locales/en/translation.json";
import WeatherForecast from "./locales/en/weather-forecast.json";
import Water from "./locales/en/water.json";

declare module "react-i18next" {
	interface CustomTypeOptions {
		defaultNS: typeof translationEn;
		resources: {
			"translation": typeof translationEn;
			"weather-forecast": typeof WeatherForecast;
			"water": typeof Water;
		}
	}
}

type Language = "en" | "zh";
export { Language };