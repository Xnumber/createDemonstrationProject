import React from "react";
import { TextField, Button, Modal, Box, Typography } from "@mui/material";
import { XEnd } from "templates/xEnd";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LoginRequest } from "service/auth/type";
import { useLoginMutation } from "service/auth/login";
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

export const Login = () => {
	const { t } = useTranslation("simple-content-management");
	const { handleSubmit, control, register, formState, getValues } = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onBlur"
	});
	const [login] = useLoginMutation();

	const [loginOpen, setLoginOpen] = React.useState(false);
	
	const [ errorOpen ] = React.useState(false);

	const handleClickOpen = () => {
		setLoginOpen(true);
	};

	const handleClose = () => {
		setLoginOpen(false);
	};

	const onSubmit: SubmitHandler<LoginRequest> = data => {
		console.log(data);
		try {
			login(getValues()).unwrap().catch().finally(() => {
				handleClose();
			});
			// dispatch(setCredentials(user));
			// navigate("/");
		} catch (err) { console.log(err);}
	};

	register("email", 
		{ 
			required: {
				value: true,
				message: "user-name-is-required"
			},
			pattern: {
				value: /\S+@\S+\.\S+/,
				message: "Entered value does not match email format"
			}
		}); 
	register("password", { required: {
		value: true,
		message: "password-name-is-required"
	}}); 
	
	const errors = formState.errors;

	return  <> 
		<Button variant="contained" onClick={handleClickOpen}>
			{t("login")}
		</Button>
		<Modal
			open={errorOpen}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography mt={2} mb={2} variant="h6" component="h2">
					{ "Error" }
				</Typography>
				<Typography mt={2} mb={2} variant="body1" component="span">
					{ "Error" }
				</Typography>
			</Box>
		</Modal>
		<Modal
			open={loginOpen}
			onClose={handleClose}
		>
			<Box
				sx={style}
				component="form"
				autoComplete="off"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Typography variant="h6" component="h2">
					{t("login")}
				</Typography>
				<Controller
					name={"email"}
					control={control}
					render={({ field }) => (
						<TextField
							error={errors["email"] ? true: false}
							{...field}
							margin="normal"
							name={t("email")}
							label={t("email")}
							variant="outlined"
							helperText={errors["email"] ? errors["email"].message: ""}
						/>
					)}
				/>
				<Controller
					name={"password"}
					control={control}
					render={({ field }) => (
						<TextField
							error={errors["password"] ? true: false}
							{...field}
							margin="normal"
							name={t("password")}
							label={t("password")}
							variant="outlined"
							type="password"
							helperText={errors["password"] ? errors["password"].message: ""}
						/>
					)}
				/>
				<XEnd mt={2}>
					<Button
						type="submit"
						variant="contained"
					>
						{t("login")}
					</Button>
				</XEnd>
			</Box>
		</Modal>
	</>;
};

export default Login;
