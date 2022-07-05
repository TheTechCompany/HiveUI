// __tests__/ColorDot.test.ts
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ColorDot } from "../components/ColorDot";

describe("ColorDot", () => {
  test("renders at specified size", () => {
    render(<ColorDot size={5} color={"red"} />);

    const element = screen.getByRole("color-dot");

    expect(element.style.width).toBe("5px");
    expect(element.style.height).toBe("5px");
  });
});
