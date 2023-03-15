import React from "react";
import "./style.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import { useAppDispatch } from "src/app/hooks";
import { WeatherChartLegendSlice } from "features/chart/weatherLegend";
import { ChartLegendProps } from "./typing";
import { XCenter } from "templates/xCenter";
import { XBetween } from "templates/xBetween";
import { FlexBox } from "templates/flexBox";
import { XYCenter } from "templates/xyCenter";
// import { isEqual } from "lodash";
// https://www.chartjs.org/docs/latest/samples/legend/html.html

export function ChartLegend(props: ChartLegendProps) {
	const dispatch = useAppDispatch();
	const { chart, items } = props;

	return items && chart ? <XCenter mb={2} className="m-chart__legendList">
		{
			items.map((item, i) => {
				const { text, hidden, fillStyle } = item;
				const onclick = () => {
					const { datasetIndex } = item;
					if (datasetIndex !== undefined) {
						chart.setDatasetVisibility(datasetIndex, !chart.isDatasetVisible(datasetIndex));
						chart.update();
					}
				};
				
				return <FlexBox component={"li"} className="m-chart__legendItem" key={i}>
					<div className="m-chart__legendColorBox" style={{
						backgroundColor: fillStyle as string,
					}}>
					</div>
					<XYCenter className="m-chart__legendContent">
						<div>
							<XCenter className="m-chart__legendText on-background-text">
								<span>
									{ text }
								</span>
							</XCenter>
							<XBetween>
								<CenterFocusStrongIcon fontSize="large" className={item.order === 1 ? "primary-text": "surface-variant-text"} onClick={() => {
									dispatch(WeatherChartLegendSlice.actions.setTopLayerDatasetIndex({ index: i }));
								}}/>
								{
									hidden ? <VisibilityOffIcon  fontSize="large" className="secondary-text" onClick={onclick}/>: <VisibilityIcon fontSize="large" className="secondary-text" onClick={onclick}/>
								}
							</XBetween>
						</div>
					</XYCenter>
				</FlexBox>;
			})
		}
	</XCenter>: null;
}

// export const ChartLegend = memo(_ChartLegend, function(prevProps, nextProps) {
// 	if (!isEqual(prevProps, nextProps)) {
// 		return false;
// 	} else {
// 		return true;
// 	}
// });