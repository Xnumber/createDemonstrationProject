import React from "react";
import Paper from "@mui/material/Paper";
import { ColumnData } from "organisms/table/typing";
import { TypePercentageData, TypePercentageLabel } from "./type";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { EnhancedTableHead } from "organisms/table/EnhancedTableHead";
import { getComparator, stableSort } from "organisms/table/utils";
import { useAppSelector } from "src/app/hooks";
import { useGetSimpleContentQueryState } from "service/simpleContentManagement/get";
import { getTypePercentageTableData } from "../utils";
import { Order } from "organisms/table/typing";

const columns: ColumnData<keyof TypePercentageData, TypePercentageLabel>[] = [
	{
		width: 100,
		label: "type",
		dataKey: "type",
		type: "display"
	},
	{
		width: 120,
		label: "quantity-percentage",
		dataKey: "quantityPercentage",
		numeric: true,
		type: "display",
		sortable: true
	},
	{
		width: 120,
		label: "cost-percentage",
		dataKey: "costPercentage",
		numeric: true,
		type: "display",
		sortable: true
	},
];

export default function TypePercentageTable() {
	const [order, setOrder] = React.useState<Order>("asc");
	const [orderBy, setOrderBy] = React.useState<keyof TypePercentageData | "">("");
	const condition = useAppSelector(state => state.listCondition);
	const { data } = useGetSimpleContentQueryState({ type: condition.type, searchString: condition.searchString });
	const handleRequestSort = (
		_event: React.MouseEvent<unknown>,
		property: keyof TypePercentageData,
	) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};
	
	const typePercentageTableData = data ? getTypePercentageTableData(data.data): [];
	const sortedRows = stableSort(typePercentageTableData, getComparator(order, orderBy));
	
	return <><TableContainer sx={{height: "100%"}} component={Paper}>
		<Table aria-label="simple table">
			<EnhancedTableHead
				columns={columns}
				order={order}
				orderBy={orderBy}
				onRequestSort={handleRequestSort}
				rowCount={sortedRows.length}
			/>
			<TableBody>
				{
					sortedRows
						.map((row, index) => {
							return (
								<TableRow
									key={index}
								>
									{
										columns.map((column, i) => {
											const cellContent = row[column.dataKey];
											return <TableCell
												key={i}
												align={column.numeric || false ? "right" : "left"}
											>
												{
													typeof cellContent === "number" ? `${cellContent*100}%`: cellContent
												}
											</TableCell>;
										})
									}
								</TableRow>
							);
						})}
			</TableBody>
		</Table>
	</TableContainer>
	</>;
}