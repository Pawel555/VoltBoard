import styled from "styled-components";

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 600px;
  width: 100%;
  padding-right: 8px;
  overflow-y: auto;
  flex-grow: 1;
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.darkGray};
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-align: left;
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    background-color: ${({ theme }) =>
      `color-mix(in srgb, ${theme.colors.darkGray}, transparent 80%)`};
  }
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
