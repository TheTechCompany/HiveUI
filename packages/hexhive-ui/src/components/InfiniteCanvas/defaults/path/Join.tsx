import * as React from "react";
import { SVGProps } from "react";

const SvgJoin = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5.73 18.57" {...props}>
    <defs>
      <linearGradient
        id="Join_svg__a"
        x1={2.87}
        y1={18.57}
        x2={2.87}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#393839" />
        <stop offset={0.5} stopColor="#7d7e81" />
        <stop offset={1} stopColor="#393839" />
      </linearGradient>
    </defs>
    <path
      style={{
        fill: "url(#Join_svg__a)",
      }}
      d="M0 0h5.73v18.57H0z"
    />
  </svg>
);

export default SvgJoin;

