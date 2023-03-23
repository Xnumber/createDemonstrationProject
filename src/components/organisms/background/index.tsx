import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { useLocation } from "react-router-dom";
import { routes } from "src/app/router/routes";
import { backgrounds, fadeOutDuration, fadeInDuration } from "./const";
import { disableLoading, loading } from "src/lib/loading";
import { useAppSelector } from "src/app/hooks";
const Background = () => {
	const bkgRef =  useRef<HTMLDivElement>(null);
	const bkg =  useRef(new Image());
	const location = useLocation();
	const currentPageName = routes.find(r => r.path?.replace("/:lng", "") === location.pathname.replace(/\/zh|\/en/, ""));
	const [bkgState, setBkgState] = useState<"fadeIn" | "fadeOut" | "initial" | "complete" >("initial"); 
	const [transition, setTransition] = useState<string>("2s");
	const loadingQueue = useAppSelector(state => state.loading.loadingQueue);

	const loadImage = async () => {
		const bkgBlock = bkgRef.current;
		loading("LoadBackground");
		await new Promise<void>((res) => {
			if (bkgBlock && currentPageName && backgrounds[currentPageName.name]) {
				const bkgUrl = backgrounds[currentPageName.name];
				bkg.current.src = bkgUrl;
				bkg.current.onload = () => {
					disableLoading("LoadBackground");
					setTimeout(() => {
						bkgBlock.style.backgroundImage = `linear-gradient(120deg, rgba(0,0,0,0), rgba(0,0,0,1)), url(${bkgUrl})`;
						res();
					}, fadeOutDuration);
				};
			} else if(bkgBlock){
				disableLoading("LoadBackground");
				setTimeout(() => {
					bkgBlock.style.backgroundImage = "";
					res();
				}, fadeOutDuration);
			}
		});
	};

	const bkgControl = async () => {
		await loadImage();
		setTransition(fadeInDuration + "ms");
		setBkgState("complete");
	};

	useEffect(() => {
		setTransition(fadeOutDuration + "ms");
		setBkgState("initial");
		bkgControl();
	}, [location]);

	useEffect(() => {
		if (loadingQueue.find(l => l.event === "Change Route")) {
			setTransition(fadeOutDuration + "ms");
			setBkgState("initial");
		}
	}, [loadingQueue]);

	return <div
		style={{
			transition: transition
		}}
		ref={bkgRef}
		className={`m-background m-background--${bkgState}`}
	>
	</div>;
};

export { Background };