import styled from "styled-components";

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
