import { Liquid } from "organisms/liquid";
import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useGetReservoirDataQuery, useGetReservoirEveryHourServiceQuery } from "service/water/get";
import { XCenter } from "templates/xCenter";
import { waterResponseDataProcess } from "../lib";
import { useAppSelector } from "src/app/hooks";
export function Liquids() {
	const { data: reservoirEveryDayServiceData } = useGetReservoirEveryHourServiceQuery();
	const { data: reservoirData } = useGetReservoirDataQuery();
	const conditon = useAppSelector(state => state.water.condition);
	const data = (reservoirEveryDayServiceData && reservoirData) ? 
		waterResponseDataProcess(reservoirEveryDayServiceData, reservoirData, conditon): [];
	const mode = useAppSelector(state => state.theme.mode);
	
	return <Grid2 container columns={12}>
		{
			data?.map((d, i) => {
				return <Grid2 mb={1} xs={12} sm={6} md={4} key={i}>
					<XCenter>
						<Liquid
							mode={mode}
							name={d.ReservoirName}
							percent={d.ratio}
							time={d.ObservationTime}
							width={300}
							height={300}
						/>
					</XCenter>
				</Grid2>;
			})
		}
	</Grid2>;
}