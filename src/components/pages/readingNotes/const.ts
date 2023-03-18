export type ReadingNotesMenuItem = {
	label: string;
	url: string;
	activateLoading?: boolean;
}

export const menu: ReadingNotesMenuItem[] = [
	{
		label: "深入學習JavaScript模組化設計",
		url: "/",
		activateLoading: true
	},
	{
		label: "Typescript程式設計 - 創造應用程式規模的JavaScript",
		url: "/",
		activateLoading: true
	},
	{
		label: "多元裝置時代的UI/UX設計法則",
		url: "/",
		activateLoading: true
	},
	{
		label: "原則",
		url: "/",
		activateLoading: true
	},
	{
		label: "間歇高效率的番茄工作法",
		url: "/",
		activateLoading: true
	},
];