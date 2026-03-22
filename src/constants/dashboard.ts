import { WidgetType, type WidgetDimensions } from "../types/widgets";

export const WIDGET_DEFAULT_DIMENSIONS: Record<WidgetType, WidgetDimensions> = {
  [WidgetType.STATION]: { w: 4, h: 1 },
  [WidgetType.MAP]: { w: 8, h: 4 },
};
