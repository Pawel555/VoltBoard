export type WidgetDimensions = {
  w: number;
  h: number;
};

export type GridPosition = WidgetDimensions & {
  x: number;
  y: number;
};

export enum WidgetType {
  STATION = "STATION",
  MAP = "MAP",
  // TODO: This enum should be extended with additional widget types in the future.
}

export type Widget = {
  id: number | string;
  type: WidgetType;
  resourceId: string | number;
  gridPosition: GridPosition;
};
