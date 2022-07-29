// __tests__/Kanban.test.ts
import React from "react";
import { Kanban } from "../components/Kanban/Kanban";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("KanBan", () => {
  test("Tests to come when component is working", () => {
    render(<Kanban columns={[]} />);
  });
});
