import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useMemo } from "react";
import { INITIAL_ZOOM } from "../constants/locations";
import styled from "styled-components";
import { useNearbyStations } from "../hooks/hooks";

export function MapContainer() {
  const { stations, center } = useNearbyStations();

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
