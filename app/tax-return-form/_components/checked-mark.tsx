import * as React from "react";
import { SVGProps } from "react";
import CheckMark from "@/public/images/check-mark.png"
import Image from "next/image";
const CheckedMark = (props: SVGProps<SVGSVGElement>) => (
   <Image className="w-full h-full"  src={CheckMark} alt="check-mark" />
);
export default CheckedMark;
