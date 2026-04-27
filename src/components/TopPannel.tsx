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
import { LuMapPin } from "react-icons/lu";
import { useTranslation } from "react-i18next";

enum Language {
  EN = "en",
  PL = "pl",
}

type TopPanelProps = {
  editDashboard: boolean;
  setEditDashboard(value: boolean): void;
  openFindStationModal(): void;
  openAddMapModal(): void;
};

export function TopPannel({
  editDashboard,
  setEditDashboard,
  openFindStationModal,
  openAddMapModal,
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
          onClick={openAddMapModal}
          icon={<IoMapSharp />}
          text={"Add map"}
        />
        <IconButton
          value={editDashboard}
          onClick={openFindStationModal}
          icon={<LuMapPin />}
          text={t("dashboard.addStationText")}
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
