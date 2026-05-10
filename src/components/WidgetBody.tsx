import styled from "styled-components";
import type { Station } from "../types/stations";
import { WidgetType, type Widget } from "../types/widgets";
import { StationCard } from "./StationManager/StationCard";
import { Card } from "./StationManager/styles";
import { BsEvStationFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { MapContainer } from "./MapContainer";
import { NearbyStationsList } from "./NearbyStationList";

export function WidgetBody({
  widget,
  widgetData,
  isLoading,
}: {
  widget: Widget;
  widgetData?: Station;
  isLoading?: boolean;
}) {
  const { t } = useTranslation();
  const renderWidgetContent = (widget: Widget) => {
    switch (widget.type) {
      case WidgetType.STATION:
        if (isLoading) {
          return (
            <Card $isLoading $minHeight={120} $minWidth={480} $disableHover />
          );
        }

        return (
          <>
            {widgetData ? (
              <StationCard
                station={widgetData}
                disableHover
                isLoading={isLoading}
              />
            ) : (
              <EmptyStateWrapper>
                <TextWithIcon>
                  <StyledStationIcon size={24} />
                  <EmptyText>{t("dashboard.noStation")}</EmptyText>
                </TextWithIcon>
              </EmptyStateWrapper>
            )}
          </>
        );
      case WidgetType.MAP:
        return <MapContainer />;
      case WidgetType.LIST:
        return <NearbyStationsList />;
      default:
        return <div>Unknown Widget Type</div>;
    }
  };

  return <>{renderWidgetContent(widget)}</>;
}

const EmptyStateWrapper = styled(Card)`
  align-items: center;
  justify-content: center;
`;

const EmptyText = styled.h3`
  color: ${({ theme }) => theme.colors.danger};
`;

const TextWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledStationIcon = styled(BsEvStationFill)`
  color: ${({ theme }) => theme.colors.danger};
`;
