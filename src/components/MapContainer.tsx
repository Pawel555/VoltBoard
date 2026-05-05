import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { getDistance, getLocation } from "../utils/storage";
import { fetchStations } from "../api/stations/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  INITIAL_DISTANCE,
  INITIAL_LOCATION,
  INITIAL_ZOOM,
} from "../constants/locations";
import styled from "styled-components";

export function MapContainer() {
  const distance = getDistance();
  const location = getLocation();

  const center = {
    lat: location?.latitude || INITIAL_LOCATION.lat,
    lng: location?.longitude || INITIAL_LOCATION.lng,
  };

  const { data: stations } = useQuery({
    queryKey: ["MapStations", center.lat, center.lng],
    queryFn: () =>
      fetchStations({
        compact: false,
        verbose: true,
        longitude: center.lng,
        latitude: center.lat,
        distance: Number(distance) || INITIAL_DISTANCE,
        maxresults: 10,
      }),
  });

  const stationMarkers = useMemo(
    () =>
      stations?.map((s) => (
        <Marker
          key={s.id}
          position={{ lat: s.location.lat, lng: s.location.lng }}
          title={s.name}
          icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        />
      )),
    [stations],
  );

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  return (
    <MapWrapper>
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={center}
          defaultZoom={INITIAL_ZOOM}
          mapId="GOOGLE_MAP_ID"
          gestureHandling={"greedy"}
          disableDefaultUI={false}
        >
          <Marker position={center} />
          {stationMarkers}
        </Map>
      </APIProvider>
    </MapWrapper>
  );
}

const MapWrapper = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 8px;
`;
