import React, { useEffect, useRef } from "react";
import Paper from "@mui/material/Paper";
import { ColumnData } from "organisms/table/typing";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import { Box } from "@mui/material";
import { DeleteButton, DetailButton, ModifyButton } from "atoms/button";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { EnhancedTableHead } from "organisms/table/EnhancedTableHead";
import { TablePaginationActions } from "organisms/table/TablePaginationActions";
import { useLazyGetSimpleContentQuery } from "service/simpleContentManagement/get";
import { openDetailModal, openUpdateModal } from "../listActions/listActionSlice";
import { UpdateModal } from "../listActions/UpdateModal";
import { useDeleteSimpleContentMutation } from "service/simpleContentManagement/delete";
import { ContentDetailModal } from "../listActions/ContentDetailModal";
import { XCenter } from "templates/xCenter";
import { useTranslation } from "react-i18next";
import { getComparator, stableSort } from "organisms/table/utils";
import { ContentColumn, ContentData } from "service/simpleContentManagement/type";

const columns: ColumnData<keyof ContentData, keyof ContentData>[] = [
	{
		width: 200,
		label: "name",
		dataKey: "name",
		type: "display"
	},
	{
		width: 120,
		label: "type",
		dataKey: "type",
		numeric: true,
		type: "display"
	},
	{
		width: 120,
		label: "price",
		dataKey: "price",
		numeric: true,
		type: "display",
		sortable: true
	},
	{
		width: 120,
		label: "quantity",
		dataKey: "quantity",
		numeric: true,
		type: "display",
		sortable: true
	},
];

type Order = "asc" | "desc";

export const ContentListTable = () => {
	const [order, setOrder] = React.useState<Order>("asc");
	const [orderBy, setOrderBy] = React.useState<ContentColumn | "">("");
	const dispatch = useAppDispatch();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const condition = useAppSelector(state => state.listCondition);
	const counter = useRef<NodeJS.Timer>();
	const [getSimpleContent, { data, isUninitialized }] = useLazyGetSimpleContentQuery();
	const [ deleteContent ] = useDeleteSimpleContentMutation();
	const { t } = useTranslation("simple-content-management");
	const handleChangePage = (_event: unknown, newPage: number) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const handleRequestSort = (
		_event: React.MouseEvent<unknown>,
		property: ContentColumn | "",
	) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const sortedRows = stableSort(data ? data.data: [], getComparator(order, orderBy));
	
	useEffect(() => {
		clearTimeout(counter.current);
		counter.current = setTimeout(() => {
			getSimpleContent({ type: condition.type, searchString: condition.searchString });
		}, 1000);
	}, [condition.searchString]);

	useEffect(() => {
		if (!isUninitialized) {
			getSimpleContent({ type: condition.type, searchString: condition.searchString });
		}
	}, [condition.type]);

	return (
		<><TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<EnhancedTableHead
					columns={columns.map(c => ({...c, label: t(c.label)}))}
					order={order}
					orderBy={orderBy}
					onRequestSort={handleRequestSort}
					rowCount={sortedRows.length}
					action
				/>
				<TableBody>
					{
						sortedRows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => {
								return (
									<TableRow
										key={index}
									>
										{
											columns.map((column, i) => (
												<TableCell
													key={i}
													align={column.numeric || false ? "right" : "left"}
												>
													{row[column.dataKey]}
												</TableCell>
											))
										}
										<TableCell align="center">
											<XCenter>
												<Box mr={1}>
													<DetailButton onClick={() => dispatch(openDetailModal(row.id))} />
												</Box>
												<Box mr={1}>
													<ModifyButton onClick={() => dispatch(openUpdateModal(row.id)) } />
												</Box>
												<Box>
													<DeleteButton onClick={() => deleteContent({ id: row.id })} />
												</Box>
											</XCenter>
										</TableCell>
									</TableRow>
								);
							})}
				</TableBody>
			</Table>
		</TableContainer>
		<TablePagination
			rowsPerPageOptions={[5, 10, 25]}
			component="div"
			count={sortedRows.length}
			rowsPerPage={rowsPerPage}
			page={page}
			onPageChange={handleChangePage}
			onRowsPerPageChange={handleChangeRowsPerPage}
			ActionsComponent={TablePaginationActions}
			labelRowsPerPage={t("rows-per-page")}
		/>
		<UpdateModal />
		<ContentDetailModal />
		</>
	);
};