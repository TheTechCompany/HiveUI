import * as React from "react";
import { SVGProps } from "react";
import styled from "styled-components";

const RawPipeElbowComponent = (props: any) => {
  return (
    <g className={props.className}>
        <PipeElbow 
            width={50}
            height={50}
            x={props.x}
            y={props.y}
            onPointerDown={props.onMouseDown}
            style={{
                position: 'absolute',
                // left: location.x,
                // top: location.y,
                width: '50px',
                height: '50px',
                // transformBox: 'fill-box', 
                // transformOrigin: `${transformX}px ${transformY}px`, 
                // transform: `rotate(${rotation}deg) `
            }}
            />
    </g>
  )
}

export const PipeElbowComponent = styled(RawPipeElbowComponent)`
  transform-box: fill-box !important;
  transform-origin: ${p => p.transformX}px ${p => p.transformY}px;
  transform: rotate(${p => p.rotation}deg);
`

export const PipeElbow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 57.33 57.48"
    {...props}
  >
    <defs>
      <linearGradient
        id="elbow_svg__a"
        x1={1242.77}
        y1={449.23}
        x2={1256.73}
        y2={449.23}
        gradientTransform="rotate(90 859.165 -382.445)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#6f7173" />
        <stop offset={0.5} stopColor="#d3d5d6" />
        <stop offset={1} stopColor="#6f7173" />
      </linearGradient>
      <linearGradient
        id="elbow_svg__c"
        x1={1271.72}
        y1={434.35}
        x2={1271.72}
        y2={420.38}
        xlinkHref="#elbow_svg__a"
      />
      <linearGradient
        id="elbow_svg__b"
        x1={2.51}
        y1={16.25}
        x2={2.51}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#393839" />
        <stop offset={0.5} stopColor="#7d7e81" />
        <stop offset={1} stopColor="#393839" />
      </linearGradient>
      <linearGradient
        id="elbow_svg__d"
        x1={38.66}
        y1={1.96}
        x2={38.66}
        y2={-14.29}
        gradientTransform="translate(10.69 61.15)"
        xlinkHref="#elbow_svg__b"
      />
    </defs>
    <path
      d="M54.52 3.45a7 7 0 0 0-5.16-2.29H.47v14h41.9s8.37-7.71 12.15-11.71Z"
      transform="translate(-.15 -.01)"
      style={{
        fill: "url(#elbow_svg__a)",
      }}
    />
    <path
      d="M56.34 8.14a7 7 0 0 0-2.05-4.94L42.37 15.12V57h14Z"
      transform="translate(-.15 -.01)"
      style={{
        fill: "url(#elbow_svg__c)",
      }}
    />
    <path
      style={{
        fill: "url(#elbow_svg__b)",
      }}
      d="M0 0h5.02v16.25H0z"
    />
    <path
      transform="rotate(90 49.285 54.905)"
      style={{
        fill: "url(#elbow_svg__d)",
      }}
      d="M46.85 46.86h5.02v16.25h-5.02z"
    />
  </svg>
);


