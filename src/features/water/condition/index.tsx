import React, { useMemo, useCallback } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useGetReservoirDataQuery, useGetReservoirEveryHourServiceQuery } from "service/water/get";
import { getOptions } from "src/lib/option";
import { FormLabel, Typography } from "@mui/material";
import { MultipleSelect } from "molecules/multipleSelect";
import { SingleSelect } from "molecules/singleSelect";
import { useTranslation } from "react-i18next";
import { areas, modes, sorts } from "./const";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { WaterActions, WaterArea, WaterMode, WaterSort } from "../waterSlice";

export function _WaterCondition() {
	const { i18n, t, ready } = useTranslation("water");
	const { data: reservoirData } = useGetReservoirDataQuery();
	const { data: reservoirEveryHourServiceData } = useGetReservoirEveryHourServiceQuery();
	const condition = useAppSelector(state => state.water.condition);
	const dispath = useAppDispatch();
	
	const reservoirNames = reservoirData?.responseData
		.filter(r => r.EffectiveCapacity)
		.filter(r => reservoirEveryHourServiceData?.responseData.find(rED => rED.ReservoirIdentifier === r.ReservoirIdentifier))
		.map(r => r.ReservoirName);
	const reservoirOptions = useMemo(() => getOptions(reservoirNames ? reservoirNames: [], t), [reservoirData, reservoirEveryHourServiceData]);
	const modeOptions = useMemo(() => getOptions(modes, t), [i18n.language, ready]);
	const sortOptions = useMemo(() => getOptions(sorts, t), [i18n.language, ready]);
	const areaOptions = useMemo(() => getOptions(areas, t), [i18n.language, ready]);

	const handleReservoir = useCallback((e: string[]) => {
		dispath(WaterActions.handleReservoir(e));
	}, []);
	const handleMode = useCallback((e: string) => {
		dispath(WaterActions.handleMode(e as WaterMode));
	}, []);

	const handleSort = useCallback((e: string) => {
		dispath(WaterActions.handleSort(e as WaterSort));
	}, []);
	const handleArea = useCallback((e: string) => {
		dispath(WaterActions.handleArea(e as WaterArea));
	}, []);

	return <><Grid2 container columns={12}>
		<Grid2 xs={12}>
			<FormLabel id="compare">
				<Typography variant="h3">
					{t("condition")}
				</Typography>
			</FormLabel>
		</Grid2>
	</Grid2>
	<Grid2 container columns={12}>
		<Grid2 xs={12} md={3}>
			<MultipleSelect
				label={t("reservoir-multiple")}
				defaultSelected={condition.reservoirChosen}
				options={reservoirOptions}
				callback={handleReservoir}
			/>
		</Grid2>
		<Grid2 xs={12} md={3}>
			<SingleSelect
				label={t("mode")}
				options={modeOptions}
				defaultSelected={condition.modeChosen[0]}
				callback={handleMode}
			/>
		</Grid2>
		<Grid2 xs={12} md={3}>
			<SingleSelect 
				label={t("sort")}
				options={sortOptions}
				defaultSelected={condition.sortChosen[0]}
				callback={handleSort}
			/>
		</Grid2>
		<Grid2 xs={12} md={3}>
			<SingleSelect
				label={t("area")}
				options={areaOptions}
				defaultSelected={condition.areaChosen[0]}
				callback={handleArea}
			/>
		</Grid2>
	</Grid2></>;
}

export const WaterCondition = React.memo(_WaterCondition);