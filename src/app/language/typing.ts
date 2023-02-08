import { CustomTypeOptions } from "react-i18next";
export type LanguageResourceContentKey<T extends keyof CustomTypeOptions["resources"]> = keyof CustomTypeOptions["resources"][T];