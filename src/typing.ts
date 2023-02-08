import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { IconType } from "react-icons/lib";

export type FeatureType = "weather" 
// | "water" | "ecnomic";
export type LegendForWhichFeature = `${FeatureType}Legend$`;
export type CanvasRenderingContext2DHandler = (ctx: CanvasRenderingContext2D) => void;
export type PCardData<T> = {
	Icon: IconType | OverridableComponent<SvgIconTypeMap> & { muiName: string } ;
	title: T;
	contents: T[];
	example?: string;
}[]