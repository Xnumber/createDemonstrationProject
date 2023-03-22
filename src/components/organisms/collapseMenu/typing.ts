export type CollapseMenuItem<L = string> = {
	label: L;
	url: string;
	activateLoading?: boolean;
	external?: boolean;
}

export type CollapseMenuProps = {
	items: CollapseMenuItem[]
}