import { RegisterOptions } from "react-hook-form";
import { ContentColumn } from "service/simpleContentManagement/type";
export const validations: { 
	name: Exclude<ContentColumn, "id">,
	condition: RegisterOptions 
}[]= [
	{
		name: "name",
		condition: {
			required: {
				value: true,
				message: "name-is-required"
			},
		}
	},
	{
		name: "type",
		condition: {
			required: {
				value: true,
				message: "type-is-required"
			},
		}
	},
	{
		name: "price",
		condition: {
			required: {
				value: true,
				message: "price-is-required"
			},
			pattern: {
				value: /^(0|[1-9][0-9]*)$/,
				message: "price-must-be-number"
			}
		}
	},
	{
		name: "quantity",
		condition: {
			required: {
				value: true,
				message: "quantity-is-required"
			},
			pattern: {
				value: /^(0|[1-9][0-9]*)$/,
				message: "quantity-must-be-number"
			}
		}
	}
];