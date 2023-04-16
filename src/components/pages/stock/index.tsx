import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { StockChart } from "organisms/stockChart";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useTranslation } from "react-i18next";
import { YCenter } from "templates/yCenter";
import { data, designs, features, memoryLeaks, tools } from "./const";
const Stock = () => {
	const { t } = useTranslation("stock");
	return <Box className="p-stock">
		<Typography variant="h1">
			{t("canvas-stock")}
		</Typography>
		<StockChart />;
		<Grid2 component={"section"} mb={3} container columns={12}>
			<Grid2 xs={12}>
				<Typography variant="h2">
					{t("features")}
				</Typography>
				<Paper variant="elevation">
					<Grid2 container columns={12}>
						<Grid2 xs={12}>
							<YCenter>
								<ul>
									{
										features.map((f, i) => {
											return <Typography component={"li"} variant="body1" key={i}>
												{t(f)}
											</Typography>;
										})
									}
								</ul>
							</YCenter>
						</Grid2>
					</Grid2>
				</Paper>
			</Grid2>
		</Grid2>
		<Grid2 component={"section"} mb={3} container columns={12}>
			<Grid2 xs={12}>
				<Typography variant="h2">
					{t("design")}
				</Typography>
				<Paper variant="elevation">
					<Grid2 container columns={12}>
						<Grid2 xs={12}>
							<YCenter>
								<ul>
									{
										designs.map((f, i) => {
											return <Typography component={"li"} variant="body1" key={i}>
												{t(f)}
											</Typography>;
										})
									}
								</ul>
							</YCenter>
						</Grid2>
					</Grid2>
				</Paper>
				
			</Grid2>
		</Grid2>
		<Grid2 component={"section"} mb={3} container columns={12}>
			<Grid2 xs={12}>
				<Typography variant="h2">
					{t("data")}
				</Typography>
				<Paper variant="elevation">
					<Grid2 container columns={12}>
						<Grid2 xs={12}>
							<YCenter>
								<ul>
									{
										data.map((f, i) => {
											return <Typography component={"li"} variant="body1" key={i}>
												{t(f)}
											</Typography>;
										})
									}
								</ul>
							</YCenter>
						</Grid2>
					</Grid2>
				</Paper>
			</Grid2>
		</Grid2>
		<Grid2 component={"section"} mb={3} container columns={12}>
			<Grid2 xs={12}>
				<Typography variant="h2">
					{t("tool")}
				</Typography>
				<Paper variant="elevation">
					<Grid2 container columns={12}>
						<Grid2 xs={12}>
							<YCenter>
								<ul>
									{
										tools.map((f, i) => {
											return <Typography component={"li"} variant="body1" key={i}>
												{t(f)}
											</Typography>;
										})
									}
								</ul>
							</YCenter>
						</Grid2>
					</Grid2>
				</Paper>
			</Grid2>
		</Grid2>
		<Grid2 component={"section"} mb={3} container columns={12}>
			<Grid2 xs={12}>
				<Typography variant="h2">
					{t("memory-leak-check")}
				</Typography>
				<Paper variant="elevation">
					<Grid2 container columns={12}>
						<Grid2 xs={12}>
							<YCenter>
								<ul>
									{
										memoryLeaks.map((f, i) => {
											return <Typography component={"li"} variant="body1" key={i}>
												{t(f)}
											</Typography>;
										})
									}
								</ul>
							</YCenter>
						</Grid2>
					</Grid2>
				</Paper>
			</Grid2>
		</Grid2>
	</Box>;
};
export default Stock;