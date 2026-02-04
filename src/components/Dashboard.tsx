import GridLayout, { type Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { DashboardWrapper } from "./styles";
import { useState } from "react";

export function Dashboard() {
  const initLayout = [
    { i: "a", x: 0, y: 0, w: 2, h: 2 },
    { i: "b", x: 2, y: 0, w: 2, h: 2 },
    { i: "c", x: 4, y: 0, w: 2, h: 2 },
  ];

  const [layout, setLayout] = useState<Layout>(initLayout);

  return (
    <DashboardWrapper>
      <GridLayout
        className="layout"
        layout={layout}
        width={1200}
        onLayoutChange={(newLayout) => {
          setLayout(newLayout);
        }}
      >
        <div key="a">A</div>
        <div key="b">B</div>
        <div key="c">C</div>
      </GridLayout>
    </DashboardWrapper>
  );
}
