export type Connection = {
  ID: number;
  StatusType: {
    IsOperational: boolean;
  };
  PowerKW: number;
};

export type AddressInfo = {
  Title: string;
  AddressLine1: string;
  Town: string;
  StateOrProvince: string;
  CountryID: number;
};

export type StatusType = {
  IsOperational: boolean;
};

export interface StationDto {
  ID: number;
  AddressInfo: AddressInfo;
  Connections: Connection[];
  StatusType: StatusType;
}

export type FetchStationsParams = {
  maxresults?: number;
  // Set to true to remove reference data objects from output (just returns IDs for common reference data such as DataProvider etc).
  compact: boolean;
  //Set to false to get a smaller result set with null items removed.
  verbose: boolean;
  // Exact match on a given numeric country id (comma separated list) array[string]
  countryid?: string[];
  // 2-character ISO Country code to filter to one specific country
  countrycode?: string;
  // Optionally filter results by a max distance from the given latitude/longitude
  distance?: number;
  distanceunit?: "km" | "miles";
  // Exact match on a given OCM POI ID (comma separated list)
  chargepointid?: string;
  //Longitude for distance calculation and filtering
  longitude?: number;
  //Latitude for distance calculation and filtering
  latitude?: number;
};
