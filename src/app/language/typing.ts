import { CustomTypeOptions } from "react-i18next";
export type LanguageNamespace = keyof CustomTypeOptions["resources"];
export type LanguageResourceContentKey<T extends keyof CustomTypeOptions["resources"]> = keyof CustomTypeOptions["resources"][T];