import React from "react";
import type { RootState } from "store";
import { useSelector } from "react-redux";

import { LoadingOrganism } from "organisms";

const Loading = () => {
	const loading = useSelector((state: RootState) => state.loading.loading);
	return <LoadingOrganism
		loading={loading}
	/>;
};

export default Loading;