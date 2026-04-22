import styled, { keyframes, css } from "styled-components";

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 550px;
  padding-right: 8px;
  overflow-y: auto;
  flex-grow: 1;
`;
const pulse = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;

const hoverEffect = css`
  border-color: ${({ theme }) => theme.colors.accent};
  background-color: ${({ theme }) =>
    `color-mix(in srgb, ${theme.colors.darkGray}, transparent 80%)`};
`;

export const Card = styled.div<{
  $isLoading?: boolean;
  $disableHover?: boolean;
  $selected?: boolean;
  $minWidth?: number;
  $minHeight?: number;
}>`
  background-color: ${({ theme, $isLoading }) =>
    $isLoading ? theme.colors.textGray : theme.colors.darkGray};
  border: 1px solid ${({ theme }) => theme.colors.border};

  ${({ $minWidth }) => $minWidth && `min-width: ${$minWidth}px;`}
  ${({ $minHeight }) => $minHeight && `min-height: ${$minHeight}px;`}
  width: 100%;
  text-align: left;
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  transition: all 0.2s ease-in-out;
  cursor: ${({ onClick }) => (onClick ? "pointer" : "inherit")};
  animation: ${({ $isLoading }) =>
    $isLoading
      ? css`
          ${pulse} 1.5s infinite ease-in-out
        `
      : "none"};

  ${({ $disableHover }) =>
    !$disableHover &&
    css`
      &:hover {
        ${hoverEffect}
      }
    `}

  ${({ $selected }) => $selected && hoverEffect}
`;

export const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.accent};
  margin: 0;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textGray};
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

export const StatsRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: 500;
`;

export const Availability = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`;

export const SideInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  height: 100%;
  min-height: 60px;
`;

export const Badge = styled.div<{ $isBusy: boolean }>`
  background: ${(props) =>
    props.$isBusy ? "rgba(255, 171, 0, 0.1)" : "rgba(0, 230, 118, 0.1)"};
  color: ${(props) =>
    props.$isBusy ? props.theme.colors.orange : props.theme.colors.accent};
  border: 1px solid
    ${(props) =>
      props.$isBusy ? props.theme.colors.orange : props.theme.colors.accent};
  padding: 4px 10px;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: bold;
  display: flex;
  align-items: center;
`;

export const IconTextWrpper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 4px;
`;

// Search
export const SearchContainer = styled.div`
  background: ${({ theme }) => theme.colors.darkGray};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const InputWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  background: ${({ theme }) => theme.colors.inputBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  transition: border-color 0.2s;

  gmp-place-autocomplete {
    background: transparent;
    width: 100%;
    border: none;
    border-radius: 12px;
  }
`;

export const StyledInput = styled.input`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  padding: 14px 0;
  padding-left: 10px;
  width: 100%;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.small};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textGray};
  }
`;
