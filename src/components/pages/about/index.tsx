import React from "react";
import { Typography, Link, Paper } from "@mui/material";
import { XCenter } from "templates/xCenter";
import { useTranslation } from "react-i18next";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Clement from "./clement.jpg";
import { XYCenter } from "templates/xyCenter";
import { readingNotes } from "./const";
import "./style.scss";
import { YCenter } from "templates/yCenter";

const About = () => {
	const { t, i18n } = useTranslation("about");

	return <div className="p-about">
		<Grid2 mb={3} container columns={8}>
			<Grid2 sm={8} md={3}>
				<img height="auto" width={"100%"} src={Clement} alt="profile"/>
			</Grid2>
			<Grid2 sm={8} md={5}>
				<XYCenter height={"100%"} flexDirection={"column"}>
					<Typography
						variant="h1"
						fontSize={{ xs: "3rem", sm: i18n.language === "zh" ? "5rem" : "3rem" }}
						textAlign={{ xs: "center", md: "left" }}
					>
						{t("clementsyu")}
					</Typography>
					<XCenter mb={1}>
						<Typography align="center" component={"p"} variant="body1">
							{t("about-self-intro-1")}
						</Typography>
					</XCenter>
					<XCenter mb={2}>
						<Typography align="center" component={"p"} variant="body1">
							{t("about-self-intro-2")}
						</Typography>
					</XCenter>
					<XCenter mb={1}>
						<Link variant="body1" href="https://github.com/Xnumber?tab=repositories">
							GitHub
						</Link>
					</XCenter>
				</XYCenter>
			</Grid2>
			<Grid2 sm={8}>
				<Typography variant="h2">
					{t("reading-notes")}
				</Typography>
				<Paper variant="elevation" className="p-about__readingNotes">
					<Grid2 container columns={5}>
						<Grid2 xs={5} md={2}>
							<YCenter height={"100%"}>
								<ul className="p-about__readingNotesList">
									{
										readingNotes.map((r, i) => {
											return<li className="p-about__readingNotesItem" key={i}>
												<Link variant="body2" href={r.url}>
													{r.name}
												</Link>
											</li>;
										})
									}
								</ul>
							</YCenter>
						</Grid2>
						<Grid2 xs={2} md={3}>
							<img height="auto" width={"100%"} src={"https://frontenddeveloper.url.tw/public/image/books.jpg"} alt="books" />
						</Grid2>
					</Grid2>
				</Paper>
			</Grid2>
			<Grid2 sm={8}>
				<Typography variant="h2">
					{t("my-little-hobby")}
				</Typography>
				<Paper 
					variant="elevation" 
					className="p-about__readingNotes"
				>
					<Grid2 container columns={2}>
						<Grid2 xs={5} md={3}>
							<YCenter height={"100%"}>
								<ul className="p-about__readingNotesList">
									<li className="p-about__readingNotesItem">
										<Link variant="body2" href={"https://frontenddeveloper.url.tw/public/image/examination.jpg"} target="_blank">
											{t("steinbach-music-grade-advancing-examination")}
										</Link>
									</li>
								</ul>
							</YCenter>
						</Grid2>
					</Grid2>
				</Paper>
			</Grid2>
		</Grid2>
	</div>;
};

export default About;