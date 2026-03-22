import GridLayout, { type Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { DashboardWrapper, WidgetWrapper } from "./styles";
import { useState } from "react";
import { TopPannel } from "./TopPannel";
import { Modal } from "./Modal";
import { useTranslation } from "react-i18next";
import { StationManager } from "./StationManager/StationManager";
import { WidgetBody } from "./WidgetBody";
import { WidgetType, type Widget } from "../types/widgets";
import { useQuery } from "@tanstack/react-query";
import { fetchStations } from "../api/stations/api";
import { initialWidgetMock } from "../mock/dashboard.mock";
import { getWidgets, saveWidgets } from "../utils/storage";
import { WIDGET_DEFAULT_DIMENSIONS } from "../constants/dashboard";

export function Dashboard() {
  const { t } = useTranslation();

  const [editDashboard, setEditDashboard] = useState(false);
  const [openFindStationModal, setOpenFindStationModal] = useState(false);

  const [widgets, setWidgets] = useState<Widget[]>(
    getWidgets() || initialWidgetMock,
  );

  const widgetResourceIds = widgets.map((w) => w.resourceId);

  const { data: stations, isLoading } = useQuery({
    queryKey: ["stations"],
    queryFn: () =>
      fetchStations({
        compact: false,
        verbose: false,
        countrycode: "PL",
        chargepointid: widgetResourceIds.join(","),
      }),
  });

  const renderWidget = () => {
    // TODO: Map only whe widget content is changed,

    return widgets.map((widget) => {
      const widgetData = stations?.find((s) => s.id === widget.resourceId);

      return (
        <WidgetWrapper key={widget.id} $editStyle={editDashboard}>
          <WidgetBody
            widget={widget}
            widgetData={widgetData}
            isLoading={isLoading}
          />
        </WidgetWrapper>
      );
    });
  };

  const onLayoutChange = (newLayout: Layout) => {
    //TODO: add saving in local storage only when position is changed
    const updatedWidgets = widgets.map((w) => {
      const layoutItem = newLayout.find((l) => l.i === w.id.toString());
      if (layoutItem) {
        return {
          ...w,
          gridPosition: {
            x: layoutItem.x,
            y: layoutItem.y,
            w: layoutItem.w,
            h: layoutItem.h,
          },
        };
      }
      return w;
    });

    setWidgets(updatedWidgets);
  };

  const addNewWidgets = (
    resourceIds: (string | number)[],
    type: WidgetType,
  ) => {
    switch (type) {
      case WidgetType.STATION:
        {
          const newWidgets: Widget[] = resourceIds.map((id) => ({
            id: `${id}-${Date.now()}`,
            type,
            resourceId: id,
            gridPosition: {
              x: 0,
              y: Infinity,
              ...WIDGET_DEFAULT_DIMENSIONS[WidgetType.STATION],
            },
          }));
          saveWidgets([...widgets, ...newWidgets]);
          setWidgets((prevWidgets) => [...prevWidgets, ...newWidgets]);
        }
        break;
    }
  };

  return (
    <DashboardWrapper>
      <Modal
        isOpen={openFindStationModal}
        onClose={() => setOpenFindStationModal(false)}
        title={t("dashboard.modalTitle")}
      >
        {openFindStationModal && (
          <StationManager
            saveSelectedStations={(stationsIds: (string | number)[]) => {
              addNewWidgets(stationsIds, WidgetType.STATION);
              setOpenFindStationModal(false);
            }}
          />
        )}
      </Modal>
      <TopPannel
        editDashboard={editDashboard}
        setEditDashboard={setEditDashboard}
        openFindStationModal={() => setOpenFindStationModal(true)}
      />
      <GridLayout
        className="layout"
        // TODO:  map only whe widget grid position is changed,
        layout={widgets.map((w) => ({
          i: w.id.toString(),
          x: w.gridPosition.x,
          y: w.gridPosition.y,
          w: w.gridPosition.w,
          h: w.gridPosition.h,
        }))}
        width={1200}
        dragConfig={{ enabled: editDashboard }}
        style={{ marginTop: 24 }}
        onLayoutChange={onLayoutChange}
      >
        {renderWidget()}
      </GridLayout>
    </DashboardWrapper>
  );
}
