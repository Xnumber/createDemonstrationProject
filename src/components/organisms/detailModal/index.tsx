import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DetailModalProps } from "./type";
import  Grid2  from "@mui/material/Unstable_Grid2";
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

export function DetailModal(props: DetailModalProps) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const { details, title, img } = props;
	return (
		<div>
			<Button onClick={handleOpen}>Open modal</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					{
						img ? <img width={"30%"} src={img}/>: null
					}
					<Typography mt={2} mb={2} id="modal-modal-title" variant="h6" component="h2">
						{ title }
					</Typography>
					<Grid2 container columns={3}>
						{
							details.map((d, i) => {
								return <><Grid2 xs={3} sm={1} key={i}>
									{d.column}
								</Grid2>
								<Grid2 xs={3} sm={2} key={i}>
									{d.content}
								</Grid2>
								</>;
							})
						}
					</Grid2>
				</Box>
			</Modal>
		</div>
	);
}