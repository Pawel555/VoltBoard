import { WidgetType, type Widget } from "../types/widgets";

export const initialWidgetMock: Widget[] = [
  {
    id: 0,
    gridPosition: {
      x: 0,
      y: 0,
      w: 4,
      h: 1,
    },
    type: WidgetType.STATION,
    resourceId: "478923",
  },
  {
    id: 1,
    gridPosition: {
      x: 2,
      y: 0,
      w: 4,
      h: 1,
    },
    type: WidgetType.STATION,
    resourceId: "station2",
  },
];
