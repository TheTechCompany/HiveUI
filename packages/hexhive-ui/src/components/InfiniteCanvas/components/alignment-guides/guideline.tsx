import React from 'react';
import styled from 'styled-components';

const BaseGuideline = (props: any) => {
    return (
        <div 
            className={props.className} 
            style={{ top: props.top, left: props.left, background: 'blue' }} />
    )
}

export const Guideline = styled(BaseGuideline)`

    &.guide {
        background: #1b47f3;
        color: #1b47f3;
        // display: none;
        left: 0;
        position: absolute;
        top: 0;
        z-index: 100;
    }

    &.active {
        display: block;
    }

    &.xAxis {
        height: ${p => p.height}px;
        width: 1px;
    }

    &.yAxis {
        height: 1px;
        width: ${p => p.width}px;
    }
`