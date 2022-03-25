// __tests__/Kanban.test.ts
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { AvatarList } from "../components";

describe("AvatarList", () => {
  test("check if avatar initials render", () => {
    render(<AvatarList users={[{ name: "John Doe", color: "red" }]} />);

    const element = screen.getByText("JD");
    expect(element).toBeInTheDocument();
  });
});
