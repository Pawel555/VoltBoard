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
  ListWrapper,
  MainInfo,
  SideInfo,
  StatsRow,
  Subtitle,
  Title,
} from "./styles";

interface StationListProps {
  stations: Station[];
  isLoading: boolean;
}

export const StationList = ({ stations, isLoading }: StationListProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <ListWrapper>
        {[...Array(6)].map((_, i) => (
          <Card key={i} $isLoading={true} />
        ))}
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      {stations.map((station) => (
        <Card key={station.id}>
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
                  station.isBusy
                    ? darkTheme.colors.orange
                    : darkTheme.colors.accent
                }
              />
              {station.isBusy ? t("dashboard.busy") : t("dashboard.available")}
            </Badge>
          </SideInfo>
        </Card>
      ))}
    </ListWrapper>
  );
};
