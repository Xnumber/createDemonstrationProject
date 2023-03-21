import React, { useEffect } from "react";
import { disableLoading } from "src/lib/loading";
export const withCloseLoadingOnMount = (WrappedComponent: React.LazyExoticComponent<() => JSX.Element>) => {
	return () => {
		useEffect(() => {
			disableLoading("Change Route");
		}, []);
		return <WrappedComponent />;
	};
};