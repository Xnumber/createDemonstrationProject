import translationEn from "./locales/en/translation.json";

declare module "react-i18next" {
	interface CustomTypeOptions {
		defaultNS: typeof translationEn;
		resources: {
			"translation": typeof translationEn;
		}
	}
}
type Language = "en" | "zh";
export { Language };