import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import ChainedBackend from "i18next-chained-backend";
import { store } from "src/app/store";
import { hideLoading, showLoading } from "features/loading/loadingSlice";
import LanguageDetector from "i18next-browser-languagedetector";
// https://www.npmjs.com/package/i18next-resources-to-backend

const pathnameArray = location.pathname.split("/");
const lng =	pathnameArray[1];
i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.use(ChainedBackend)
	.init({
		// 若不設定會去尋找瀏覽器的語言navigator.language
		lng: lng ? lng: (navigator.language?.includes("zh") ? "zh": "en"),
		fallbackLng: false,
		react: {
			useSuspense: false
		},
		saveMissing: true,
		backend: {
			backends: [
				resourcesToBackend((language, namespace, callback) => {
					store.dispatch(showLoading({ event: `${namespace}/${language}`, message: "" }));
				
					import(`./locales/${language}/${namespace}.json`)
						.then((resources) => {
							// console.log(`${namespace}/${language}`);
							callback(null, resources);
							store.dispatch(hideLoading({ event: `${namespace}/${language}`, message: "" }));
						})
						.catch((error) => {
							callback(error, null);
						});
				})
			],
		}
	});

export default i18n;