import GridLayout, { type Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  DashboardWrapper,
  WidgetWrapper,
  DeleteButtonWrapper,
  DeleteIcon,
  DeleteButton,
} from "./styles";
import { useMemo, useState } from "react";
import { TopPannel } from "./TopPannel";
import { Modal } from "./Modal";
import { useTranslation } from "react-i18next";
import { StationManager } from "./StationManager/StationManager";
import { WidgetBody } from "./WidgetBody";
import { WidgetType, type Widget } from "../types/widgets";
import { useQuery } from "@tanstack/react-query";
import { fetchStations } from "../api/stations/api";
import { initialWidgetMock } from "../mock/dashboard.mock";
import {
  getWidgets,
  saveDistance,
  saveLocation,
  saveWidgets,
} from "../utils/storage";
import {
  WIDGET_DEFAULT_DIMENSIONS,
  WIDGET_MIN_MAX_DIMENSIONS,
} from "../constants/dashboard";
import { LocationManager } from "./LocationManager/LocationManager";
import { MAX_NUMBER_OF_STATIONS } from "../constants/managers";
import { LocationDialogType } from "../types/common";

export function Dashboard() {
  const { t } = useTranslation();

  const [editDashboard, setEditDashboard] = useState(false);
  const [openFindStationModal, setOpenFindStationModal] = useState(false);
  const [openLocationModal, setLocationModal] = useState<
    LocationDialogType | false
  >(false);

  const [widgets, setWidgets] = useState<Widget[]>(
    getWidgets() || initialWidgetMock,
  );

  const widgetResourceIds = useMemo(
    () =>
      widgets
        .filter((w) => w.type === WidgetType.STATION)
        .map((w) => w.resourceId),
    [widgets],
  );

  const { data: stations, isLoading } = useQuery({
    queryKey: ["stations", widgetResourceIds],
    queryFn: () =>
      fetchStations({
        compact: false,
        verbose: false,
        countrycode: "PL",
        chargepointid: widgetResourceIds.join(","),
      }),
  });

  const disableMapButton = widgets.some((w) => w.type === WidgetType.MAP);
  const disableListButton = widgets.some((w) => w.type === WidgetType.LIST);

  const deleteWidget = (widgetId: string | number) => {
    const updatedWidgets = widgets.filter((w) => w.id !== widgetId);
    setWidgets(updatedWidgets);
  };

  const renderWidget = () => {
    return widgets.map((widget) => {
      const widgetData = stations?.find((s) => s.id === widget.resourceId);

      return (
        <WidgetWrapper key={widget.id} $editStyle={editDashboard}>
          {editDashboard && (
            <DeleteButtonWrapper>
              <DeleteButton onClick={() => deleteWidget(widget.id)}>
                <DeleteIcon />
              </DeleteButton>
            </DeleteButtonWrapper>
          )}
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
      case WidgetType.MAP:
        {
          const newMapWidget: Widget = {
            id: `${Date.now()}`,
            type,
            resourceId: 1,
            gridPosition: {
              x: 0,
              y: Infinity,
              ...WIDGET_DEFAULT_DIMENSIONS[WidgetType.MAP],
            },
          };
          saveWidgets([...widgets, newMapWidget]);
          setWidgets((prevWidgets) => [...prevWidgets, newMapWidget]);
        }
        break;
    }
  };

  const handleEditDashboard = (value: boolean) => {
    if (value) {
      setEditDashboard(true);
    } else {
      setEditDashboard(false);
      saveWidgets(widgets);
    }
  };

  const renderStationModal = () => (
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
          widgetStations={widgetResourceIds}
        />
      )}
    </Modal>
  );

  const renderAddMapModal = () => {
    const isMapDialog = openLocationModal === LocationDialogType.MAP;
    return (
      <Modal
        isOpen={!!openLocationModal}
        onClose={() => setLocationModal(false)}
        title={
          isMapDialog
            ? t("locationManager.addMap")
            : t("locationManager.listTitle")
        }
      >
        {openLocationModal && (
          <LocationManager
            addWidget={(distance, location) => {
              saveLocation(location);
              saveDistance(distance);
              if (isMapDialog) {
                addNewWidgets([], WidgetType.MAP);
              } else {
                addNewWidgets([], WidgetType.LIST);
              }
              setLocationModal(false);
            }}
            subtitle={`${t("locationManager.chooseLocation")} ${
              isMapDialog ? t("dashboard.onMap") : t("dashboard.inList")
            }
          `}
          />
        )}
      </Modal>
    );
  };

  return (
    <DashboardWrapper>
      {renderStationModal()}
      {renderAddMapModal()}
      <TopPannel
        editDashboard={editDashboard}
        setEditDashboard={handleEditDashboard}
        openFindStationModal={() => setOpenFindStationModal(true)}
        setLocationModal={setLocationModal}
        disableMapButton={disableMapButton}
        disableListButton={disableListButton}
        disableStationButton={
          widgetResourceIds.length >= MAX_NUMBER_OF_STATIONS
        }
      />
      <GridLayout
        className="layout"
        layout={widgets.map((w) => ({
          i: w.id.toString(),
          x: w.gridPosition.x,
          y: w.gridPosition.y,
          w: w.gridPosition.w,
          h: w.gridPosition.h,
          ...WIDGET_MIN_MAX_DIMENSIONS[w.type],
        }))}
        width={1200}
        dragConfig={{ enabled: editDashboard }}
        resizeConfig={{ enabled: editDashboard }}
        style={{ marginTop: 24 }}
        onLayoutChange={onLayoutChange}
      >
        {renderWidget()}
      </GridLayout>
    </DashboardWrapper>
  );
}
