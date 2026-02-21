import GridLayout, { type Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { DashboardWrapper, WidgetWrapper } from "./styles";
import { useState } from "react";
import { TopPannel } from "./TopPannel";
import { Modal } from "./Modal";
import { useTranslation } from "react-i18next";

export function Dashboard() {
  const { t } = useTranslation();
  const initLayout = [
    { i: "a", x: 0, y: 0, w: 2, h: 2 },
    { i: "b", x: 2, y: 0, w: 2, h: 1 },
    { i: "c", x: 4, y: 0, w: 2, h: 2 },
  ];

  const [layout, setLayout] = useState<Layout>(initLayout);
  const [editDashboard, setEditDashboard] = useState(false);
  const [openFindStationModal, setOpenFindStationModal] = useState(false);

  const renderWidget = () => {
    return layout.map((widget) => {
      return (
        <WidgetWrapper key={widget.i} $editStyle={editDashboard}>
          <p>{widget.i}</p>
        </WidgetWrapper>
      );
    });
  };

  return (
    <DashboardWrapper>
      <Modal
        isOpen={openFindStationModal}
        onClose={() => setOpenFindStationModal(false)}
        title={t("dashboard.modalTitle")}
      ></Modal>
      <TopPannel
        editDashboard={editDashboard}
        setEditDashboard={setEditDashboard}
        openFindStationModal={() => setOpenFindStationModal(true)}
      />
      <GridLayout
        className="layout"
        layout={layout}
        width={1200}
        dragConfig={{ enabled: editDashboard }}
        style={{ marginTop: 24 }}
        onLayoutChange={(newLayout) => {
          setLayout(newLayout);
        }}
      >
        {renderWidget()}
      </GridLayout>
    </DashboardWrapper>
  );
}
