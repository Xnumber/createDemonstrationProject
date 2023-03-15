import React from "react";
import { TableHead, TableRow, TableCell, TableSortLabel, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { visuallyHidden } from "@mui/utils";
type Order = "asc" | "desc";

interface EnhancedTableProps {
	columns: { 
		dataKey: string;
		label: string;
		sortable?: boolean;
		numeric?: boolean;
	}[];
	numSelected?: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
	action?: boolean;
}

export const EnhancedTableHead = (props: EnhancedTableProps) => {
	const { columns, order, orderBy, onRequestSort, action } = props;
	const { t } = useTranslation("simple-content-management");
	const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{
					columns.map((headCell, i) => (
						<TableCell
							key={i}
							align={headCell.numeric ? "right" : "left"}
							sortDirection={orderBy === headCell.dataKey ? order : false}
						>
							{
								headCell.sortable ? <TableSortLabel
									active={orderBy === headCell.dataKey}
									direction={orderBy === headCell.dataKey ? order : "asc"}
									onClick={createSortHandler(headCell.dataKey)}
								>
									{headCell.label}
									{ orderBy === headCell.dataKey ? (
										<Box component="span" sx={visuallyHidden}>
											{order === "desc" ? "sorted descending" : "sorted ascending"}
										</Box>
									) : null}
								</TableSortLabel>: headCell.label
							}
						</TableCell>
					))
				}
				{
					action ?
						<TableCell align={"center"}>
							{t("action")}
						</TableCell>: null
				}
			</TableRow>
		</TableHead>
	);
};