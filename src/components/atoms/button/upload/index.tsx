import React from "react";
import { useUploadSimpleContentMutation } from "service/simpleContentManagement/upload";
import XLSX from "xlsx";
import { Button } from "@mui/material"
;
import { useTranslation } from "react-i18next";
export function UpLoadButton() {
	const [ upload ] = useUploadSimpleContentMutation();
	const { t } = useTranslation("simple-content-management");
	const upLoadFile: React.ReactEventHandler<HTMLInputElement> = (e) => {
		// console.log(123)
		// 讀取文件
		const file = e.currentTarget.files;
		if (file) {
			const reader = new FileReader();
			reader.readAsBinaryString(file[0]);
			reader.onload = function(e) {
				const data = e.target?.result;
				// 解析Excel數據
				const workbook = XLSX.read(data, { type: "binary" });
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];
				const json = XLSX.utils.sheet_to_json(worksheet) as { [k: string]: string | number }[];
				// 輸出數據
				upload(json).unwrap();
				// login({ "username": "123", password: "123" });
			};
		}
	};
	
	return <Button
		variant="contained"
		component="label"
	>
		{t("upload")}
		<input
			onChange={upLoadFile}
			type="file"
			accept=".xlsx"
			hidden
		/>
	</Button>;
}