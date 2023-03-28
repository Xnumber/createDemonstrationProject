import React from "react";
import { TextField, Button, Modal, Box, Typography } from "@mui/material";
import { XEnd } from "templates/xEnd";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LoginRequest } from "service/auth/type";
import { useLoginMutation } from "service/auth/login";
import { modalBoxStyle } from "src/style/modal";
import { SimpleContentManagementKey } from "src/app/language/typing";

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
	
	const [ errorOpen, setErrorOpen ] = React.useState(false);

	const handleClickOpen = () => {
		setLoginOpen(true);
	};

	const handleClose = () => {
		setLoginOpen(false);
	};

	const onSubmit: SubmitHandler<LoginRequest> = () => {
		try {
			login(getValues()).unwrap().then(e => {
				if (e.errors) {
					setErrorOpen(true);
					setTimeout(() => {
						setErrorOpen(false);
					}, 2000);
				} else {
					handleClose();
				}
			});
		} catch (err) { console.log(err); }
	};

	register("email", 
		{ 
			required: {
				value: true,
				message: "email-is-required"
			},
			pattern: {
				value: /\S+@\S+\.\S+/,
				message: "wrong-email-format"
			}
		}); 
	register("password", { required: {
		value: true,
		message: "password-is-required"
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
			<Box sx={modalBoxStyle}>
				{/* <Typography mt={2} mb={2} variant="h6" component="h2">
					{ "Error" }
				</Typography> */}
				<Typography mt={2} mb={2} variant="body1" component="span">
					{t("incorrect-username-or-password")}
				</Typography>
			</Box>
		</Modal>
		<Modal
			open={loginOpen}
			onClose={handleClose}
		>
			<Box
				sx={modalBoxStyle}
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
							helperText={errors["email"] ? t(errors["email"].message as SimpleContentManagementKey): ""}
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
							helperText={errors["password"] ? t(errors["password"].message as SimpleContentManagementKey): ""}
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
