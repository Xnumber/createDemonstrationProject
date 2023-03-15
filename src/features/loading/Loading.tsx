import React, { useEffect } from "react";
import type { RootState } from "store";
import { useSelector } from "react-redux";
import { LoadingBackdrop } from "organisms";
import { disableLoading } from "src/lib/loading";
const Loading = () => {
	const events = useSelector((state: RootState) => state.loading.loadingQueue);

	useEffect(() => {
		if (events.length === 1 && events[0].event === "Complete") {
			disableLoading("Complete");
		}
	}, [events]);

	return <LoadingBackdrop
		events={events}
	/>;
};

export default Loading;