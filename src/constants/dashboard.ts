import {
  WidgetType,
  type WidgetDimensions,
  type WidgetMinMaxDimensions,
} from "../types/widgets";

export const WIDGET_DEFAULT_DIMENSIONS: Record<WidgetType, WidgetDimensions> = {
  [WidgetType.STATION]: { w: 4, h: 1 },
  [WidgetType.MAP]: { w: 8, h: 2 },
};

export const WIDGET_MIN_MAX_DIMENSIONS: Record<
  WidgetType,
  WidgetMinMaxDimensions
> = {
  [WidgetType.STATION]: { maxH: 2, minH: 1, maxW: 6, minW: 4 },
  [WidgetType.MAP]: { maxH: 4, minH: 1, maxW: 12, minW: 2 },
};
