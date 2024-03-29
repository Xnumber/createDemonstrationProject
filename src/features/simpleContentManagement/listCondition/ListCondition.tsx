import { Box, InputAdornment, Tab, Tabs, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { XBetween } from "templates/xBetween";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { ListConditionProps, setSearchString, setType } from "./ListConditionSlice";

function a11yProps(index: string) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const typesMapping: { label: ListConditionProps["type"], value: number}[] = [
	{ label: "", value: 0 },
	{ label: "a", value: 1 },
	{ label: "b", value: 2 },
	{ label: "c", value: 3 }
];

const _ListCondition = () => {
	const { t } = useTranslation("simple-content-management");
	const condition = useAppSelector(state => state.listCondition);
	const dispatch = useAppDispatch();

	const handleType = useCallback((_e: React.SyntheticEvent, value: number) => {
		const target = typesMapping.find(tM => tM.value === value);
		if (target) {
			dispatch(setType(target.label));
		}
	}, []);
	
	const handleSearchString: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
		dispatch(setSearchString(e.currentTarget.value));
	}, []);

	const tabValue = typesMapping.find(tM => tM.label === condition.type)?.value;

	return <XBetween mb={3}>
		<div>
			<Box sx={{ width: "100%" }}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs color="secondary" value={tabValue} onChange={handleType} aria-label="basic tabs example">
						<Tab label={"All"} {...a11yProps("")}/>
						<Tab label={"A"} {...a11yProps("a")} />
						<Tab label={"B"} {...a11yProps("b")} />
						<Tab label={"C"} {...a11yProps("c")} />
					</Tabs>
				</Box>
			</Box>
		</div>
		<div>
			<TextField
				value={condition.searchString}
				onChange={handleSearchString}
				id="input-with-icon-textfield"
				label={t("search")}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon htmlColor="var(--md-sys-color-secondary)"/>
						</InputAdornment>
					),
				}}
			/>
		</div>
	</XBetween>;
};

export const ListCondition = React.memo(_ListCondition);