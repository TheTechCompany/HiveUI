// GraphGrid Tests
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Box } from "@mui/material";

import { GraphGrid } from "../components";

describe("GraphGrid", () => {
  test("TO DO - THIS TESTS NOTHING YET", () => {
    render(
      <GraphGrid
        onLayoutChange={() => void 0}
        layout={[
          {
            id: "1",
            label: "label 1",
            total: "total 1",
            x: 0,
            y: 0,
            w: 2,
            h: 2,
          },
        ]}
        children={(item: any) => <Box>{item.id}</Box>}
      />
    );
  });
});
