import type { Station } from "../../types/stations";
import { api } from "../axiosIntance";
import { mapStationDtoToStation } from "./mapper";
import type { FetchStationsParams, StationDto } from "./types";

export const fetchStations = async (
  params: FetchStationsParams,
): Promise<Station[]> => {
  const { data } = await api.get<StationDto[]>("/poi", { params });
  return data.map(mapStationDtoToStation);
};
