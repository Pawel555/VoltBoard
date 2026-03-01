import { useState } from "react";
import { LuMapPin } from "react-icons/lu";
import { darkTheme } from "../../styles/theme";
import { LuNavigation } from "react-icons/lu";
import { IconButton } from "../IconButton";
import { IoIosSearch } from "react-icons/io";
import { useTranslation } from "react-i18next";
import {
  HeaderRow,
  InputGroup,
  InputWrapper,
  SearchContainer,
  StyledInput,
} from "./styles";

type StationSearchProps = {
  onSearch: (value: string) => void;
};

export function StationSearch({ onSearch }: StationSearchProps) {
  const [inputValue, setInputValue] = useState("");

  const { t } = useTranslation();

  const handleSearch = () => {
    onSearch(inputValue);
    setInputValue("");
  };

  return (
    <SearchContainer>
      <HeaderRow>
        <LuNavigation size={18} color={darkTheme.colors.accent} />
        <span>{t("dashboard.searchTitle")}</span>
      </HeaderRow>
      <InputGroup>
        <InputWrapper>
          <LuMapPin size={14} color={darkTheme.colors.textGray} />
          <StyledInput
            placeholder={t("dashboard.searchPlaceholder")}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </InputWrapper>
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
