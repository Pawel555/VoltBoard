import { IconButton } from "./IconButton";
import {
  ButtonsWrapper,
  IconWrapper,
  LightningBoltIcon,
  SettingsIcon,
  TitleWrapper,
} from "./styles";

export function TopPannel({
  editDashboard,
  setEditDashboard,
}: {
  editDashboard: boolean;
  setEditDashboard(value: boolean): void;
}) {
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ display: "flex", gap: "10px" }}>
        <IconWrapper>
          <LightningBoltIcon />
        </IconWrapper>
        <TitleWrapper>
          <h2>{"EV Charging Hub"}</h2>
          <p style={{ opacity: 0.5 }}>
            {"Monitor and manage your charging network"}
          </p>
        </TitleWrapper>
      </div>
      <ButtonsWrapper>
        <IconButton
          value={editDashboard}
          onClick={setEditDashboard}
          Icon={<SettingsIcon />}
        />
      </ButtonsWrapper>
    </div>
  );
}
