import { useDispatch } from "react-redux";
import { contentColumns } from "service/simpleContentManagement/const";
import { useGetSimpleContentQueryState } from "service/simpleContentManagement/get";
import { useAppSelector } from "src/app/hooks";
import { setDetailModalShown } from "./listActionSlice";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Modal } from "@mui/material";
import  Grid2  from "@mui/material/Unstable_Grid2";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import { useTranslation } from "react-i18next";
const style = {
	position: "absolute" as const,
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "50%",
	maxHeight: "60%",
	overflow: "scroll",
	bgcolor: "var(--md-sys-color-background)",
	border: "2px solid var(--md-sys-color-outline)",
	color: "var(--md-sys-color-secondary)",
	boxShadow: 24,
	p: 4,
};

export const ContentDetailModal = () => {
	const id = useAppSelector(state => state.listAction.contentDetailModalId);
	const { t } = useTranslation("simple-content-management");
	const shown = useAppSelector(state => state.listAction.contentDetailModalShown);
	const condition = useAppSelector(state => state.listCondition);
	const { data } = useGetSimpleContentQueryState({ type: condition.type, searchString: condition.searchString });
	const contents = data?.data.find(o => o.id === id);
	const dispatch = useDispatch();
	const details = contents ? contentColumns.map(o => ({ column: o, content: contents[o] }))
		: [];
	const title = details.find(o => o.column === "name")?.content;
	const image = details.find(o => o.column === "image")?.content;

	return <Modal
		open={shown}
		onClose={() => dispatch(setDetailModalShown(false))}
		aria-labelledby="modal-modal-title"
		aria-describedby="modal-modal-description"
	>
		<Box sx={style}>
			{
				image && image !== "null" ? <img width={"30%"} src={(image as string).replace("public", "http://localhost/storage")}/>: 
					<BrokenImageIcon fontSize="large"/>
			}
			<Typography mt={2} mb={2} id="modal-modal-title" variant="h6" component="h2">
				{ title }
			</Typography>
			{
				details.map((d, i) => {
					if (d.column !== "image") {
						return <Grid2 mb={2} key={i} container columns={3}>
							<Grid2 xs={3} sm={1} >
								{t(d.column)}
							</Grid2>
							<Grid2 xs={3} sm={2}>
								{d.content}
							</Grid2>
						</Grid2>;
					}
				})
			}
		</Box>
	</Modal>;
};