import type { Station } from "../../types/stations";
import type { StationDto } from "./types";

export const mapStationDtoToStation = (dto: StationDto): Station => ({
  id: dto.ID,
  name: dto.AddressInfo.Title,
  address: dto.AddressInfo.AddressLine1,
  availableSlots: dto.Connections.filter(
    (c) => c.StatusType?.IsOperational ?? true,
  ).length,
  totalSlots: dto.Connections.length,
  powerKW: Math.max(...dto.Connections.map((c) => c.PowerKW), 0),
  isBusy: dto.StatusType?.IsOperational ? false : true,
});
