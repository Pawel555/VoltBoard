export type Coordinates = {
  lat: number;
  lng: number;
};

export type LocationData = {
  locationString: string;
  latitude: number;
  longitude: number;
};

export enum LocationDialogType {
  LIST = "LIST",
  MAP = "MAP",
}
