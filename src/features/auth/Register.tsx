import React from "react";
import { TextField, Button, Modal, Box, Typography } from "@mui/material";
import { XEnd } from "templates/xEnd";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RegisterRequest, useRegisterMutation } from "service/auth/register";
import { useAppSelector } from "src/app/hooks";
import { SimpleContentManagementKey } from "src/app/language/typing";
import { modalBoxStyle } from "src/style/modal";

export const Register = () => {
	const { t } = useTranslation("simple-content-management");
	const user = useAppSelector(state => state.auth.user);
	const { handleSubmit, control, register, formState: { errors }, getValues } = useForm({
		defaultValues: {
			email: "",
			name: "",
			password: "",
			password_confirmation: ""
		},
		mode: "onBlur"
	});
	const [registerUser] = useRegisterMutation();

	const [loginOpen, setLoginOpen] = React.useState(false);
	
	const [ errorOpen ] = React.useState(false);

	const handleClickOpen = () => {
		setLoginOpen(true);
	};

	const handleClose = () => {
		setLoginOpen(false);
	};

	const onSubmit: SubmitHandler<RegisterRequest> = () => {
		registerUser(getValues()).unwrap().catch().finally(() => {
			handleClose();
		});
	};
	
	register("name", { required: {
		value: true,
		message: "name-is-required"
	}}); 
	register("password", { 
		required: {
			value: true,
			message: "password-is-required"
		},
		
		// https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
		pattern: {
			value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
			message: "password-column-message"
		}
	}); 

	register("password_confirmation", { 
		required: {
			value: true,
			message: "password-is-required"
		},
		validate: { 
			same: (value) => getValues().password === value ? true: "should-password-same"
		},
	});
	register("email", { 
		required: {
			value: true,
			message: "email-is-required"
		},
		pattern: {
			value: /\S+@\S+\.\S+/,
			message: "wrong-email-format"
		}
	});

	return <>
		{
			user === null ? <> <Button variant="contained" onClick={handleClickOpen}>
				{t("register")}
			</Button>
			<Modal
				open={errorOpen}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalBoxStyle}>
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
					sx={modalBoxStyle}
					component="form"
					autoComplete="off"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Typography variant="h6" component="h2">
						{t("register")}
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
						name={"name"}
						control={control}
						render={({ field }) => (
							<TextField
								error={errors["name"] ? true: false}
								{...field}
								margin="normal"
								name={t("name")}
								label={t("name")}
								variant="outlined"
								helperText={errors["name"] ? t(errors["name"].message as SimpleContentManagementKey): ""}
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
								helperText={errors["password"] ? t(errors["password"].message as SimpleContentManagementKey): ""}
								type="password"
							/>
						)}
					/>
					<Controller
						name={"password_confirmation"}
						control={control}
						render={({ field }) => (
							<TextField
								error={errors["password_confirmation"] ? true: false}
								{...field}
								margin="normal"
								name={t("password-confirmation")}
								label={t("password-confirmation")}
								variant="outlined"
								type="password"
								helperText={errors["password_confirmation"] ? t(errors["password_confirmation"].message as SimpleContentManagementKey): ""}
							/>
						)}
					/>
					<XEnd mt={2}>
						<Button
							type="submit"
							variant="contained"
						>
							{t("register")}
						</Button>
					</XEnd>
				</Box>
			</Modal></>: null
		}
	</>;
};

export default Register;
