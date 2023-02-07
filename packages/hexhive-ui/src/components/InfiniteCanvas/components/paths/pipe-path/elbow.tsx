import * as React from "react";
import { SVGProps } from "react";
import styled from "styled-components";

export const PipeElbowComponent = (props: any) => {

  const [ rotation, setRotation ] = React.useState(0);

  // React.useEffect(() => {
  //   let timer = setInterval(() => {
  //     setRotation((rotation) => rotation + 90)
  //   }, 1000)
  //   return () => {
  //     clearInterval(timer);
  //   }
  // }, [])

  return (
        <PipeElbow 
            width={50}
            height={50}
            x={props.x + 32.5}
            y={props.y - 40}
            rotation={rotation || props.rotation + 180}
            transformX={10 || props.transformY}
            transformY={47.5 || props.transformX}
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
  )
}


export const RawPipeElbow = (props: any) => (
  
  <g 
    x={props.x}
    y={props.y}
    width={props.width}
    height={props.height}
    style={props.style}
    onPointerDown={props.onPointerDown}
    className={props.className}>

    
    <g fill="#C5C7C9">
      <path d="M58.9 48.1H29.1c-16 0-19.5-5.5-19.5-21.6V0H12l-.2 25.7c-.2 15.4 2.9 20.4 18.1 20.2l28.9-.2.1 2.4z" />
      <path d="M58.9 50.5H28.8C8.5 51.2 7.1 44 7.1 26.7V.2h2.4v26.4c0 16.1 3.4 21.6 19.5 21.6h30l-.1 2.3z" />
    </g>
    <path
      fill="#B2B4B6"
      d="m58.9 45.7-29.1.2c-15.4.2-18.4-4.9-18.2-20.3L11.8 0h2.4l.2 27.6c.1 12.6.8 15.3 13.4 15.5l31 .2v2.4z"
    />
    <path
      fill="#B2B4B6"
      d="M58.9 52.8H28.6C10.2 52.8 4.9 45.4 4.9 27V.1h2.4v26.6c0 17.3 4.4 23.8 21.8 23.8h30v2.3h-.2z"
    />
    <path
      fill="#8D8F91"
      d="m58.9 43.3-31.1-.2c-12.6-.1-13.3-2.8-13.4-15.5L14.2 0h2.4l-.1 26.3c-.1 12.3.4 14.8 12.7 14.7l29.8-.1v2.4h-.1z"
    />
    <path
      fill="#8D8F91"
      d="M58.9 55.2H28.3c-19.7 0-26-8.4-26-28.1V.1h2.4V27c0 18.4 5.4 25.9 23.9 25.9H59v2.3h-.1z"
    />
    <path
      fill="#787A7C"
      d="m16.5.1-.1 26.3c0 12.2.4 14.8 12.7 14.7l29.8-.1v-2.4h-30c-10.8 0-9.9-1.2-9.9-12V0h-2.5v.1z"
    />
    <path
      fill="#787A7C"
      d="M0 0h2.3v27c0 19.9 6.6 28.5 26.5 28.3l30.1-.2v2.4L26 57.1C6.7 56.9.7 48.9.4 29.5L0 0z"
    />
    <path
      fill="#848688"
      d="m1 0 .4 28.7c.3 19.1 6.2 27 25.3 27.3l32.2.3v-1.2H28.1C8.7 55 2.5 46.8 2.4 27.3L2.3.1 1 0z"
    />
    <path
      fill="#808284"
      d="m17.9.1-.5 24.5c-.4 13 .7 16.1 13.7 15.7l27.7-.6V41l-29 .4c-12.8.3-13.6-2.5-13.5-15.3l.2-26h1.4z"
    />
    <path
      fill="#999B9D"
      d="M3.4.1h1.3l.1 27c.1 18.2 5.3 25.5 23.6 25.6l30.4.1V54L27 53.6C9 53.3 4.1 46.3 3.8 28.3L3.4.1z"
    />
    <path
      fill="#999B9D"
      d="M15.2.1h-1v26.8c0 13.2 1.1 16.4 14.4 16.4h30.3v-1.2l-29.1.3c-13.4.3-14.8-3.1-14.7-16.6L15.2.1z"
    />
    <path
      fill="#A6A8AA"
      d="M13 .1h1.3l.1 27c.1 13.1 1.3 16.2 14.4 16.2h30.1v1l-31.3-.2c-12.9-.1-13.8-2.9-14.1-15.8L13 .1z"
    />
    <path
      fill="#A6A8AA"
      d="M4.7.1H6l-.3 25.1C5.5 44.1 11.4 52 30.2 51.7l28.6-.2v1.2H28.7c-18.6.1-24-7.4-24-26V.1z"
    />
    <path
      fill="#D0D2D3"
      d="M8.2.1v26.4c0 16.9 4.1 23 21 22.9l29.6-.1v-1.2l-28.1.3c-17.2.3-21.1-6.2-20.9-23.3L9.5.1H8.2z"
    />
    <path
      fill="#D0D2D3"
      d="m10.6.1-.1 28c-.1 14.1 2.2 18.8 16.3 19.1l32.1-.2v1.1l-31.6.5C13.4 48.1 9.7 43 9.6 29.1L9.4 0h1.2v.1z"
    />
    {/* <circle cx={props.transformX} cy={props.transformY} r={1} /> */}
  </g>
    
);

const PreStyled = styled(RawPipeElbow)`
  transform-origin: ${p => p.transformX}px ${p => p.transformY}px !important;
`


export const PipeElbow = styled(PreStyled)`
  transform-box: fill-box !important;
  transform: translate(${p => p.x}px, ${p => p.y}px) scale(0.7) rotate(${p => p.rotation}deg);
`
