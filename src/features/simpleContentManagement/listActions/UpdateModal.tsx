import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import  Grid2  from "@mui/material/Unstable_Grid2";
import { Controller, RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { TextField, Modal } from "@mui/material";
import { useTranslation } from "react-i18next";
import { XEnd } from "templates/xEnd";
import { XBetween } from "templates/xBetween";
import CloseIcon from "@mui/icons-material/Close";
import { YCenter } from "templates/yCenter";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { setUpdateModalShown } from "./listActionSlice";
import { useGetSimpleContentQueryState } from "service/simpleContentManagement/get";
import { ContentColumn, ContentData } from "service/simpleContentManagement/type";
import { useUpdateSimpleContentMutation } from "service/simpleContentManagement/update";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { SimpleContentManagementKey } from "src/app/language/typing";
import { modalBoxStyle } from "src/style/modal";

const validations: { name: ContentColumn, condition: RegisterOptions }[]  = [
	{
		name: "name",
		condition: {
			required: {
				value: true,
				message: "name-is-required"
			},
		}
	},
	{
		name: "type",
		condition: {
			required: {
				value: true,
				message: "type-is-required"
			},
		}
	},
	{
		name: "price",
		condition: {
			required: {
				value: true,
				message: "price-is-required"
			},
			pattern: {
				value: /^(0|[1-9][0-9]*)$/,
				message: "price-must-be-number"
			}
		}
	},
	{
		name: "quantity",
		condition: {
			required: {
				value: true,
				message: "quantity-is-required"
			},
			pattern: {
				value: /^(0|[1-9][0-9]*)$/,
				message: "quantity-must-be-number"
			}
		}
	}
];

export const UpdateModal = () => {
	const dispatch = useAppDispatch();
	const handleClose = () => dispatch(setUpdateModalShown(false));
	const shown = useAppSelector(state => state.listAction.updateModalShown);
	const id = useAppSelector(state => state.listAction.updateModalContentId);
	const { t } = useTranslation("simple-content-management");
	const condition = useAppSelector(state => state.listCondition);
	const { data } = useGetSimpleContentQueryState({ type: condition.type, searchString: condition.searchString });
	const [src, setSrc] = React.useState("");
	const [ update ] = useUpdateSimpleContentMutation();
	let content: ContentData | undefined ;
	
	if (shown && id && data) {
		content = data.data.find(o => o.id === id);
	}
	
	const { handleSubmit, control, reset, register, formState: { errors } } = useForm({
		defaultValues: content,
		mode: "onBlur"
	});
	
	const contentKeys = content ? Object.keys(content) as (keyof typeof content)[]: [];

	const onSubmit: SubmitHandler<ContentData> = data => {
		const form = new FormData();
		const formKeys = Object.keys(data) as (keyof ContentData)[];
		
		formKeys.forEach(e => {
			if (e !== "image") {
				form.append(e, data[e] as string);
			}
		});

		Array.from(data.image).forEach(e => {
			form.append("image[]", e);
		});

		update(form);
	};
	
	validations.forEach(v => {
		register(v.name, v.condition);
	});

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
	
	const { onChange: imgOnChange, ...imgRest } = register("image");

	useEffect(() => {
		if (content) {
			reset(content);
		}

		if (content?.image && shown) {
			setSrc(content.image.replace("public", "http://localhost/storage"));
		}
		
	}, [shown]);

	return (
		<Modal
			open={shown}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box 
				component="form"
				autoComplete="off"
				onSubmit={handleSubmit(onSubmit)}
				sx={modalBoxStyle}
			>
				<XBetween>
					<Typography mt={2} mb={2} id="modal-modal-title" variant="h6" component="h2">
						{t("update")}
					</Typography>
					<YCenter>
						<CloseIcon onClick={handleClose}/>
					</YCenter>
				</XBetween>
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
				<Typography mt={2} mb={2} id="modal-modal-title" variant="h3" component="h2">
					{ content ? content.name: "" }
				</Typography>
				<Grid2 container columns={3}>
					{
						contentKeys.map((k , i) => {
							const errorMessage = errors[k]?.message;
							return <Grid2 mb={2} xs={3} sm={3} key={i}>
								{
									k !== "image" ? <Controller
										name={k}
										control={control}
										render={({ field }) => (
											<TextField
												disabled={k === "id"}
												error={errors[k] ? true: false}
												{...field}
												margin="normal"
												name={k}
												label={t(k)}
												variant="outlined"
												helperText={errorMessage ? t(errorMessage as SimpleContentManagementKey): ""}
											/>
										)}
									/>: null
								}
							</Grid2>;
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
	);
};