import { Box, Typography } from "@mui/material";
import React, {  useEffect } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useTranslation } from "react-i18next";
import { TypePercentageChart } from "features/simpleContentManagement/typePercentageChart/TypePercentageChart";
import { ContentListTable } from "features/simpleContentManagement/listTable/ContentListTable";
import TypePercentageTable from "features/simpleContentManagement/typePercentageTable/TypePercentageTable";
import Login from "features/auth/Login";
import Logout from "features/auth/Logout";
import Register from "features/auth/Register";
import { useAppSelector } from "src/app/hooks";
import { YCenter } from "templates/yCenter";
import { ListCondition } from "features/simpleContentManagement/listCondition/ListCondition";
import { useCheckLoginMutation, useGetXCSRFTokenQuery } from "service/auth/api";
import { UpLoadButton } from "atoms/button";
import { CreateModal } from "organisms/createModal";
import { FlexBox } from "templates/flexBox";

export function SimpleContentManagement() {
	const { t } = useTranslation("simple-content-management");
	const user = useAppSelector(state => state.auth.user);
	const { isSuccess } = useGetXCSRFTokenQuery();
	const [checkLogin] = useCheckLoginMutation();

	useEffect(() => {
		if (isSuccess) {
			checkLogin();
		}
	}, [isSuccess]);
	
	return <>
		<Typography variant="h1">
			{t("simple-content-management")}
		</Typography>
		<YCenter mb={2}>
			<Box mr={2}>
				<Typography variant="h3">
					{ user ? user.name: t("guest")}
				</Typography>
			</Box>
			{
				user ? <Box mr={2}>
					<Logout />
				</Box>: null
			}
			{
				user ? null: <>
					<Box mr={2}>
						<Login />
					</Box>
					<Box mr={2}>
						<Register />
					</Box>
				</>
			}
		</YCenter>
		{
			user ? <div>
				<FlexBox mb={2}>
					<Box mr={2}>
						<UpLoadButton />
					</Box>
					<Box mr={2}>
						<CreateModal />
					</Box>
				</FlexBox>
				<ListCondition />
				<Grid2 container columns={12}>
					<Grid2 xs={12}>
						<ContentListTable />
					</Grid2>
				</Grid2>
				<Grid2 container columns={12}>
					<Grid2 xs={12} md={6}>
						<TypePercentageTable />
					</Grid2>
					<Grid2 xs={12} md={6}>
						<TypePercentageChart />
					</Grid2>
				</Grid2>
			</div>: null
		}
	</>;
}	