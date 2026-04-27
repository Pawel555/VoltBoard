import { useRef, useState, useEffect } from "react";
import { LuNavigation } from "react-icons/lu";

import type { Coordinates } from "../types/common";
import {
  HeaderRow,
  InputGroup,
  InputWrapper,
  SearchContainer,
} from "./LocationSearch.styles";
import { IconButton } from "./IconButton";
import { darkTheme } from "../styles/theme";

type LocationSearchProps = {
  onSearch: (value: Coordinates) => void;
  buttonText: string;
  buttonIcon: React.ReactElement<SVGSVGElement>;
  searchTitle?: string;
};

export function LocationSearch({
  onSearch,
  buttonText,
  buttonIcon,
  searchTitle,
}: LocationSearchProps) {
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

  const handleSearch = () => {
    onSearch(location);
  };

  return (
    <SearchContainer>
      {searchTitle && (
        <HeaderRow>
          <LuNavigation size={18} color={darkTheme.colors.accent} />
          <span>{searchTitle}</span>
        </HeaderRow>
      )}

      <InputGroup>
        <InputWrapper ref={containerRef} />

        <IconButton
          text={buttonText}
          onClick={handleSearch}
          value={true}
          icon={buttonIcon}
          useActiveStyle
        />
      </InputGroup>
    </SearchContainer>
  );
}
