export type GridPosition = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export enum WidgetType {
  STATION = "STATION",
  MAP = "MAP",
  // TODO: This enum should be extended with additional widget types in the future.
}

export type Widget = {
  id: number;
  type: WidgetType;
  resourceId: string;
  gridPosition: GridPosition;
};
