export type CollapseMenuItem<L = string> = {
	label: L;
	url: string;
	activateLoading?: boolean;
}
export type CollapseMenuProps = {
	items: CollapseMenuItem[]
}