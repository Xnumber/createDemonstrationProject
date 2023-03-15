import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
export const ProjectInput = styled(InputBase)(() => ({
	"& .MuiInputBase-input": {
		padding: "16px 26px 16px 12px",
		border: "1px solid var(--md-sys-color-secondary)",
		"&:focus": {
			borderColor: "var(--md-sys-color-on-background)",
			boxShadow: "0 0 0 0 black",
		},
	},
}));