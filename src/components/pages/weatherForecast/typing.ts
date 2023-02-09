type WeatherRawData = {
	success: boolean,
	result: {
		resource_id: string;
		fields: {id: string, type: string}
	},
	records: {
		locations: {
			datasetDescription: string;
			locationsName: string;
			dataid: string;
			location: {
				locationName: string;
				geocode: string;
				lat: string;
				lon: string;
				weatherElement: {
					elementName: string;
					description: string;
					time: {
						startTime: string;
						endTime: string;
						elementValue: {
							value: string;
							measures: string;
						}[]
					}[]
				}[]
			}[]
		}[]
	}
}

type WeatherRawDataLocation = WeatherRawData["records"]["locations"][number]["location"];
type WeatherTData = { x: string, y: string }[];
export type { WeatherTData, WeatherRawData, WeatherRawDataLocation };