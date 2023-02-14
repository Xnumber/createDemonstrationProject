import React from "react";
import "./style.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import { useAppDispatch } from "src/app/hooks";
import { WeatherChartLegendSlice } from "features/chart/weatherLegend";
import { ChartLegendProps } from "./typing";
// import { isEqual } from "lodash";
// https://www.chartjs.org/docs/latest/samples/legend/html.html

export function ChartLegend(props: ChartLegendProps) {
	const dispatch = useAppDispatch();
	const { chart, items } = props;

	return items && chart ? <ul>
		{
			items.map((item, i) => {
				const { text, hidden, fontColor, fillStyle } = item;
				const onclick = () => {
					const { datasetIndex } = item;
					if (datasetIndex !== undefined) {
						chart.setDatasetVisibility(datasetIndex, !chart.isDatasetVisible(datasetIndex));
						chart.update();
					}
				};
				
				return <li key={i} >
					<CenterFocusStrongIcon color={item.order === 1 ? "primary": "disabled"}  onClick={() => {
						dispatch(WeatherChartLegendSlice.actions.setTopLayerDatasetIndex({ index: i }));
					}}/>
					{
						hidden ? <VisibilityOffIcon onClick={onclick}/>: <VisibilityIcon onClick={onclick}/>
					}
					<span className="m-legend__colorBox" style={{
						backgroundColor: fillStyle as string,
					}}>
					</span>
					<span style={{ color: fontColor as string }}>
						{ text }
					</span>
				</li>;
			})
		}
	</ul>: null;
}

// export const ChartLegend = memo(_ChartLegend, function(prevProps, nextProps) {
// 	if (!isEqual(prevProps, nextProps)) {
// 		return false;
// 	} else {
// 		return true;
// 	}
// });