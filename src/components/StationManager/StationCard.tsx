import { LuMapPin } from "react-icons/lu";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { darkTheme } from "../../styles/theme";
import { useTranslation } from "react-i18next";
import type { Station } from "../../types/stations";
import {
  Availability,
  Badge,
  Card,
  IconTextWrpper,
  MainInfo,
  SideInfo,
  StatsRow,
  Subtitle,
  Title,
} from "./styles";

type StationListProps = {
  station: Station;
  disableHover?: boolean;
  selected?: boolean;
  isLoading?: boolean;
  minWidth?: number;
  minHeight?: number;
  onClick?(): void;
};

export const StationCard = ({
  station,
  disableHover,
  selected,
  isLoading,
  minWidth,
  minHeight,
  onClick,
}: StationListProps) => {
  const { t } = useTranslation();

  return (
    <Card
      key={station.id}
      $disableHover={disableHover}
      $selected={selected}
      $isLoading={isLoading}
      $minWidth={minWidth}
      $minHeight={minHeight}
      onClick={onClick}
    >
      <MainInfo>
        <Title>{station.name}</Title>
        <IconTextWrpper>
          <LuMapPin size={14} color={darkTheme.colors.textGray} />
          <Subtitle>{station.address}</Subtitle>
        </IconTextWrpper>
        <StatsRow>
          <Availability>
            {station.availableSlots}/{station.totalSlots} available
          </Availability>
          <IconTextWrpper>
            <HiOutlineLightningBolt
              size={14}
              color={darkTheme.colors.textGray}
            />
            <Subtitle>{station.powerKW} kW</Subtitle>
          </IconTextWrpper>
        </StatsRow>
      </MainInfo>
      <SideInfo>
        <Badge $isBusy={station.isBusy}>
          <HiOutlineLightningBolt
            size={14}
            color={
              station.isBusy ? darkTheme.colors.orange : darkTheme.colors.accent
            }
          />
          {station.isBusy ? t("dashboard.busy") : t("dashboard.available")}
        </Badge>
      </SideInfo>
    </Card>
  );
};
