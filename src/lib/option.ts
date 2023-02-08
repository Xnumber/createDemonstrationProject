import { TFunction } from "react-i18next";
const getOptions = (values: string[], t: TFunction) => values.map((o) => ({ label: t(o), value: o }));
export { getOptions };