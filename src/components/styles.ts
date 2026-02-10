import { HiOutlineLightningBolt } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import styled from "styled-components";

//Dashboard
export const DashboardWrapper = styled.div`
  width: calc(100vw - 48px);
  height: calc(100vh - 48px);
  padding: 24px;
  backdrop-filter: blur(8px);
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

export const WidgetWrapper = styled.div<{ $editStyle?: boolean }>`
  display: flex;
  padding: 16px;
  border-radius: 16px;
  opacity: 1;
  border: 1px solid
    ${({ $editStyle, theme }) =>
      $editStyle
        ? `color-mix(in srgb, ${theme.colors.accent}, transparent 70%)`
        : theme.colors.border};

  cursor: ${({ $editStyle }) => ($editStyle ? "move" : "default")};
`;

//TopPannel
export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 16px;
  background-color: ${({ theme }) =>
    `color-mix(in srgb, ${theme.colors.accent}, transparent 80%)`};
  border: 1px solid
    ${({ theme }) =>
      `color-mix(in srgb, ${theme.colors.accent}, transparent 70%)`};
  aspect-ratio: 1 / 1;
  width: fit-content;
`;

export const LightningBoltIcon = styled(HiOutlineLightningBolt)`
  width: 30px;
  height: 30px;
  color: ${({ theme }) => theme.colors.accent};
`;

export const SettingsIcon = styled(IoSettingsOutline)`
  width: 18px;
  height: 16px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 12px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  white-space: nowrap;
`;

//IconButton
export const IconButtonStyled = styled.button<{ $active: boolean }>`
  display: inline-flex;
  width: 40px;
  height: 40px;
  padding: 5px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.darkGray};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  cursor: pointer;

  transition:
    background-color 1s ease,
    transform 1s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
  }

  svg {
    width: 18px;
    height: 18px;
  }

  ${({ $active, theme }) =>
    $active &&
    `color: ${theme.colors.accent};
      background-color: color-mix(in srgb, ${theme.colors.accent}, transparent 80%);
      border: 1px solid color-mix(in srgb, ${theme.colors.accent}, transparent 80%);`}
`;
