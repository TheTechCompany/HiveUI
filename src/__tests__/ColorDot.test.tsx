// __tests__/ColorDot.test.ts
import React from "react";

import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { ColorDot } from "..";

describe("ColorDot", () => {
  test("renders at specified size", () => {
    render(<ColorDot size={5} color={"red"} />);

    const element = screen.getByRole("color-dot");

    expect(element.style.width && element.style.height).toBe("5px");
  });
});
