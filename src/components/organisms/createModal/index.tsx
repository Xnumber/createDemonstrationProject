import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import  Grid2  from "@mui/material/Unstable_Grid2";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TextField, Modal } from "@mui/material";
import { useTranslation } from "react-i18next";
import { XEnd } from "templates/xEnd";
import { XBetween } from "templates/xBetween";
import CloseIcon from "@mui/icons-material/Close";
import { YCenter } from "templates/yCenter";
import { contentColumns } from "service/simpleContentManagement/const";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useCreateSimpleContentMutation } from "service/simpleContentManagement/create";
import { validations } from "./const";
import { ContentData } from "service/simpleContentManagement/type";
import { modalBoxStyle } from "src/style/modal";

export function CreateModal() {
	const [open, setOpen] = React.useState(false);
	const [src, setSrc] = React.useState("");
	const { t } = useTranslation("simple-content-management");
	const defaultValues = contentColumns.reduce((a, c) => ({...a, [c]: ""}), {});
	const { 
		handleSubmit, 
		reset,
		control, 
		register, 
		formState: { errors },
	} = useForm<ContentData>({
		defaultValues: defaultValues,
		mode: "onBlur"
	});
	
	const { onChange: imgOnChange, ...imgRest } = register("image");
	const handleOpen = () => setOpen(true);
	const handleClose = () => { reset(); setSrc(""); setOpen(false);};

	const onSubmit: SubmitHandler<ContentData> = data => {
		const form = new FormData();
		const formKeys = Object.keys(data) as (keyof ContentData)[];
		formKeys.forEach((e) => {
			if (e !== "image") {
				form.append(e, data[e] as string);
			}
		});

		Array.from(data.image).forEach((e) => {
			form.append("image[]", e);
		});

		create(form).unwrap().finally(() => {
			setOpen(false); reset(); setSrc("");
		});
	};
	
	if (validations) {
		validations.forEach(v => {
			register(v.name, v.condition);
		});
	}

	const [ create ] = useCreateSimpleContentMutation();

	const onImgInputChange: React.ReactEventHandler<HTMLInputElement> = (e) => {
		const files = e.currentTarget.files;
		if (files) {
			const file = files[0];
			const reader = new FileReader();
			reader.addEventListener("load", function() {
				const imageUrl = reader.result;
				if (typeof imageUrl === "string") {
					setSrc(imageUrl);
				}
			});
			reader.readAsDataURL(file);
		}
	};

	validations.forEach(v => {
		register(v.name, v.condition);
	});

	return <div>
		<Button
			variant="contained"
			component="label"
			onClick={handleOpen}
		>
			{t("create")}
		</Button>
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box 
				component="form"
				autoComplete="off"
				onSubmit={handleSubmit(onSubmit)}
				encType="multipart/form-data"
				sx={modalBoxStyle}
			>
				<XBetween>
					<Typography mt={2} mb={2} id="modal-modal-title" variant="h6" component="h2">
						{ t("new-content") }
					</Typography>
					<YCenter>
						<CloseIcon onClick={handleClose}/>
					</YCenter>
				</XBetween>
				<Grid2 container columns={3}>
					<Grid2 mb={2} xs={3} sm={3}>
						{
							src ? <label>
								<img width={"30%"} src={src} />
								<input
									{...imgRest}
									type="file"
									multiple
									accept="image/*"
									hidden
									onChange={e=> {
										imgOnChange(e);
										onImgInputChange(e);
									}}
								/>
							</label>: <Button
								variant="contained"
								component="label"
								startIcon={<CloudUploadIcon />}
							>
								<input
									{...imgRest}
									type="file"
									multiple
									accept="image/*"
									hidden
									onChange={e=> {
										imgOnChange(e);
										onImgInputChange(e);
									}}
								/>
								{t("select-image")}
							</Button>
						}
					</Grid2>
					{
						contentColumns.map((k, i) => {
							if(k !== "id" && k !== "image"){
								return <Grid2 xs={3} sm={3} key={i}>
									{
										<Controller
											name={k}
											control={control}
											render={({ field }) => (
												<TextField
													{...field}
													error={errors[k] ? true: false}
													margin="normal"
													name={k}
													label={t(k)}
													variant="outlined"
													helperText={errors[k] ? errors[k]?.message: ""}
												/>
											)}
										/>
									}
								</Grid2>;
							} else {
								return null;
							}
						})
					}
				</Grid2>
				<XEnd mt={2}>
					<Button
						type="submit"
						variant="contained"
					>
						{t("submit")}
					</Button>
				</XEnd>
			</Box>
		</Modal>
	</div>;
}