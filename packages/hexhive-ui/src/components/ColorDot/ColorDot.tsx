import React, { Component } from "react";

export interface ColorDotProps {
  size: number;
  color: string;
}


export const ColorDot: React.FC<ColorDotProps> = ({ size, color }) => {
  return (
    <div
      className="hive-color-dot"
      role="color-dot"
      style={{
        marginRight: 8,
        background: color,
        borderRadius: size * 2,
        height: size,
        width: size,
      }}
    />
  );
};
