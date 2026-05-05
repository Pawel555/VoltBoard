import { useEffect, useState } from "react";
import { IconButton } from "./IconButton";
import {
  ButtonsWrapper,
  IconWrapper,
  LightningBoltIcon,
  SettingsIcon,
  TitleWrapper,
} from "./styles";
import { IoLanguage, IoMapSharp } from "react-icons/io5";
import { LuMapPin, LuRadar } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { LocationDialogType } from "../types/common";

enum Language {
  EN = "en",
  PL = "pl",
}

type TopPanelProps = {
  editDashboard: boolean;
  setEditDashboard(value: boolean): void;
  openFindStationModal(): void;
  setLocationModal(value: LocationDialogType | false): void;
  disableMapButton?: boolean;
  disableListButton?: boolean;
  disableStationButton?: boolean;
};

export function TopPannel({
  editDashboard,
  setEditDashboard,
  openFindStationModal,
  setLocationModal,
  disableMapButton,
  disableListButton,
  disableStationButton,
}: TopPanelProps) {
  const [language, setLanguage] = useState<Language>(Language.EN);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ display: "flex", gap: "10px" }}>
        <IconWrapper>
          <LightningBoltIcon />
        </IconWrapper>
        <TitleWrapper>
          <h2>{t("dashboard.title")}</h2>
          <p style={{ opacity: 0.5 }}>{t("dashboard.subtitle")}</p>
        </TitleWrapper>
      </div>
      <ButtonsWrapper>
        <IconButton
          value={editDashboard}
          onClick={() => setLocationModal(LocationDialogType.LIST)}
          icon={<LuRadar />}
          text={t("locationManager.listButton")}
          disabled={disableListButton}
        />
        <IconButton
          value={editDashboard}
          onClick={() => setLocationModal(LocationDialogType.MAP)}
          icon={<IoMapSharp />}
          text={t("locationManager.addMap")}
          disabled={disableMapButton}
        />
        <IconButton
          value={editDashboard}
          onClick={openFindStationModal}
          icon={<LuMapPin />}
          text={t("stationsManager.addFavoriteStation")}
          disabled={disableStationButton}
        />
        <IconButton
          value={language === Language.EN}
          onClick={(value: boolean) =>
            setLanguage(value ? Language.EN : Language.PL)
          }
          icon={<IoLanguage />}
          text={language.toUpperCase()}
        />
        <IconButton
          value={editDashboard}
          onClick={setEditDashboard}
          text={
            editDashboard
              ? t("dashboard.saveButton")
              : t("dashboard.editButton")
          }
          icon={<SettingsIcon />}
          useActiveStyle
        />
      </ButtonsWrapper>
    </div>
  );
}
