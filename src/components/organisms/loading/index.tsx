import React, { useEffect, useState, memo } from "react";
import { XYCenter } from "src/components/templates/xyCenter";
import "./style.scss";
// import { FaSpinner } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
const _LoadingOrganism = (props: { loading: boolean }) => {
	const { loading } = props;
	const [zIndex, setZIndex] = useState(1);
	const [loadingHasBeenHidden, setLoadingHasBeenHidden] = useState(false);
	
	useEffect(() => {
		if (loading) {
			setZIndex(1);
		} else {
			if (!loadingHasBeenHidden) {
				setTimeout(() => {
					setLoadingHasBeenHidden(() => true);
				}, 300);
			}
			setTimeout(() => {
				setZIndex(-1);
			}, 600);
		}
	}, [loading]);

	let className = "";

	if (!loadingHasBeenHidden) {
		className = "";
	} else if(loading) {
		className = " o-loading--show";
	} else {
		className = " o-loading--hide";
	}
	
	return <XYCenter width={"100%"} className={`background o-loading position-fixed${className}`} height={"100%"} zIndex={zIndex}> 
		<CircularProgress className="o-loading__spinner"/>
	</XYCenter>;
};

export const LoadingOrganism = memo(_LoadingOrganism);