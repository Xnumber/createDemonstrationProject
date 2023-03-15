import { WeatherRawData } from "pages/weatherForecast/typing";
import { weatherApi } from "./api";
import { disableLoading, loading } from "src/lib/loading";
const authorization = "CWB-99433185-8573-4C40-A443-1B0D612515FF";

const api = weatherApi.injectEndpoints({
	endpoints: (build) => ({
		getWeatherForcast: build.query<WeatherRawData, { locations: string[], elements: string[]}>({
			query: ({ locations, elements }) => `F-D0047-091?Authorization=${authorization}&locationName=${locations.join(",")}&elementName=${elements.join(",")}`,
			providesTags: ["GetWeather"],
			onQueryStarted: async (
				arg, { queryFulfilled }
			) => {
				loading("GetWeather", `method: GET, locations: ${arg.locations.join(",")}, elements: ${arg.elements.join(",")}`);
				await queryFulfilled;
				disableLoading("GetWeather");
			}
		}),
	}),
});

export const { useGetWeatherForcastQuery } = api;