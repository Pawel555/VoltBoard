import { useRef, useState, useEffect } from "react";
import { LuNavigation } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { useTranslation } from "react-i18next";

import { darkTheme } from "../../styles/theme";
import { IconButton } from "../IconButton";
import { HeaderRow, InputGroup, InputWrapper, SearchContainer } from "./styles";
import type { Coordinates } from "../../types/common";

type StationSearchProps = {
  onSearch: (value: Coordinates) => void;
};

export function StationSearch({ onSearch }: StationSearchProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [location, setLocation] = useState<Coordinates>({
    lat: 50,
    lng: 19,
  });

  const initSearch = async () => {
    (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
    const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement(
      {},
    );

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(placeAutocomplete);
    }

    placeAutocomplete.addEventListener(
      "gmp-select",
      // Add the gmp-placeselect listener, and display the results.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      async ({ placePrediction }) => {
        const place = placePrediction.toPlace();
        await place.fetchFields({
          fields: ["location"],
        });

        const lat = place.location.lat();
        const lng = place.location.lng();
        setLocation({ lat, lng });
      },
    );
  };
  useEffect(() => {
    initSearch();
  }, []);
  const { t } = useTranslation();

  const handleSearch = () => {
    onSearch(location);
  };

  return (
    <SearchContainer>
      <HeaderRow>
        <LuNavigation size={18} color={darkTheme.colors.accent} />
        <span>{t("dashboard.searchTitle")}</span>
      </HeaderRow>

      <InputGroup>
        <InputWrapper ref={containerRef} />

        <IconButton
          text={t("dashboard.searchButton")}
          onClick={handleSearch}
          value={true}
          icon={<IoIosSearch />}
          useActiveStyle
        />
      </InputGroup>
    </SearchContainer>
  );
}
