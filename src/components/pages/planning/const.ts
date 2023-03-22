import { CollapseMenuItem } from "organisms/collapseMenu/typing";
import type HomeEn from "src/app/language/locales/en/home.json";

export const menu: CollapseMenuItem<keyof typeof HomeEn>[] = [
	{
		label: "work-flow",
		url: "https://1drv.ms/u/s!AjhwmEJDt_AfpHFZS5j2v59CcYjK?wd=target%28%E6%B5%81%E7%A8%8B.one%7C5E91E43E-247B-4666-BAB1-508C69259663%2F%E6%B5%81%E7%A8%8B%7C0B4295AB-01B2-4AC9-9990-B312BA2263FB%2F%29onenote:https://d.docs.live.net/1ff0b74342987038/文件/專案/流程.one#流程&section-id={5E91E43E-247B-4666-BAB1-508C69259663}&page-id={0B4295AB-01B2-4AC9-9990-B312BA2263FB}&end",
		activateLoading: true,
		external: true
	},
	{
		label: "requirement",
		url: "https://1drv.ms/u/s!AjhwmEJDt_AfpHFZS5j2v59CcYjK?wd=target%28%E9%9C%80%E6%B1%82.one%7C7CABFCE6-41F2-4B9D-B454-3B600335A03B%2F%E6%B0%B4%E6%83%85%E8%B3%87%E8%A8%8A%E8%B3%87%E6%96%99%E8%A6%96%E8%A6%BA%E5%8C%96%7CF9A93D26-8041-4A65-84D2-1DD1CD197EC3%2F%29onenote:https://d.docs.live.net/1ff0b74342987038/文件/專案/需求.one#水情資訊資料視覺化&section-id={7CABFCE6-41F2-4B9D-B454-3B600335A03B}&page-id={F9A93D26-8041-4A65-84D2-1DD1CD197EC3}&end",
		activateLoading: true,
		external: true
	},
	{
		label: "programming",
		url: "https://1drv.ms/u/s!AjhwmEJDt_AfpHFZS5j2v59CcYjK?wd=target%28%E7%A8%8B%E5%BC%8F.one%7C9A1D6C64-F633-4B0F-8251-CE96C258EEAA%2F%E5%89%8D%E7%AB%AF%E5%B0%88%E6%A1%88%E6%9E%B6%E6%A7%8B%7C08332795-0F48-4ED5-85BB-BC87B7F62C61%2F%29onenote:https://d.docs.live.net/1ff0b74342987038/文件/專案/程式.one#前端專案架構&section-id={9A1D6C64-F633-4B0F-8251-CE96C258EEAA}&page-id={08332795-0F48-4ED5-85BB-BC87B7F62C61}&end",
		activateLoading: true,
		external: true
	},
];

// https://unsplash.com/photos/OWkXt1ikC5g
export const bkgUrl = "https://images.unsplash.com/photo-1496112576525-8b31e9ce4872?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";