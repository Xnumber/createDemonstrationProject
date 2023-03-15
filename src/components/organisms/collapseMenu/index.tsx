import React, { useCallback, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { PNavLink } from "src/components/molecules/pNavLink";
import { useTranslation } from "react-i18next";
import { CollapseMenuProps } from "./typing";
import "./style.scss";
import { collapseMenuStyleCreator } from "./lib";
import { useAppSelector } from "src/app/hooks";
import { Box } from "@mui/material";
export const CollapseMenu = (props: CollapseMenuProps) => {
	const { items } = props;
	const [_items, setItems] = useState<CollapseMenuProps["items"]>([]);
	const { i18n } = useTranslation();
	const [collapse, setCollapse] = useState<boolean>(true);
	const loadingQueue = useAppSelector(state => state.loading.loadingQueue);
	
	const handleCollapse = useCallback(() => {
		setCollapse(true);
	}, []);

	const open = useCallback(() => setCollapse(false), []);

	useEffect(() => {
		setItems(items);
		collapseMenuStyleCreator(items.length);
	}, [items]);
	
	useEffect(() => {
		if (loadingQueue.length === 0) {
			open();
		}
	}, [loadingQueue.length]);

	const lng = i18n.language;

	return <nav>
		<Stack component={"ul"} className={`o-collapseMenu${collapse ? " o-collapseMenu--collapse m-pNavLink__controlledHover ": " "}overflow-hidden`} alignItems={{ xs: "center" }}>
			{
				_items.map((item, i) => {
				
					return <Box
						textAlign={{ xs: "center", md: "start"}}
						component={"li"}
						className="o-collapseMenu__item"
						key={i}
					>
						<PNavLink
							url={`/${lng}`+ item.url}
							delay={600}
							callback={handleCollapse}
							// text={t(name as LanguageResourceKeysContent)}
							text={item.label}
							activateLoading={item.activateLoading}
							fontSize="2rem"
						/>
					</Box>;
				})
			}
		</Stack>
	</nav>;
};
