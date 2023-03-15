import { CustomTypeOptions } from "react-i18next";
import type SimpleContentManagementEn from "src/app/language/locales/en/simple-content-management.json";
export type LanguageNamespace = keyof CustomTypeOptions["resources"];
export type LanguageResourceContentKey<T extends keyof CustomTypeOptions["resources"]> = keyof CustomTypeOptions["resources"][T];
export type SimpleContentManagementKey = keyof typeof SimpleContentManagementEn;